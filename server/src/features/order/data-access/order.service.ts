import { Injectable } from '@nestjs/common';
import { OrderBodyDto, OrderUpdateBodyRequestDto } from './dto/order.dto';
import { IFindOrderWhereOptions, OrderRepository } from './order.repository';
import { OrderProduct } from '../../../entities/order-product.entity';
import { getRepository } from 'typeorm';
import { ProductService } from '@features/product/data-access/product.service';
import { httpConflict } from '@shared/exceptions/http-exception';
import { EOrderStatus } from '@constants/entity.constants';

@Injectable()
export class OrderService {
	constructor(private readonly orderRepository: OrderRepository, private readonly productService: ProductService) {}

	findAndCountByOptions(options?: IFindOrderWhereOptions) {
		return this.orderRepository.findAndCountByOptions(options);
	}

	findsByOptions(options?: IFindOrderWhereOptions) {
		return this.orderRepository.findsByOptions(options);
	}

	async createOrder(data: OrderBodyDto) {
		const products = await this.productService.findByIds(data.products.map(product => product.id));
		let totalPrice: number = 0;
		const order = this.orderRepository.create({
			receiver: data.name,
			phoneNumber: data.phoneNumber,
			address: data.address,
			note: data.note || null,
		});
		const orderProducts = [] as OrderProduct[];
		if (products && products.length) {
			for (const product of data.products) {
				const _product = products.find(_ => _.id == product.id);
				const orderProduct = new OrderProduct();
				orderProduct.productId = product.id;
				orderProduct.quantity = product.quantity <= _product.quantity ? product.quantity : _product.quantity;
				orderProduct.unitPrice = _product.price;
				totalPrice += orderProduct.quantity * orderProduct.unitPrice;
				orderProducts.push(orderProduct);
				await this.productService.updateQuantity(_product.id, _product.quantity - orderProduct.quantity);
			}
		}
		order.price = totalPrice;
		const orderSaved = await this.orderRepository.save(order);
		orderProducts.forEach(_data => {
			_data.orderId = orderSaved.id;
		});
		return getRepository<OrderProduct>(OrderProduct).save(orderProducts);
	}

	async update(id: number, data: OrderUpdateBodyRequestDto) {
		if (data.status === EOrderStatus.cenceled) {
			const orderProducts = await this.orderRepository
				.getRepository<OrderProduct>(OrderProduct)
				.find({ where: { orderId: id }, select: ['productId', 'quantity'] });

			for (const iterator of orderProducts) {
				await this.productService.incrementQuantity(iterator.productId, iterator.quantity);
			}
		}
		return this.orderRepository.update(id, data);
	}

	async delete(id: number) {
		const orderProductRepo = this.orderRepository.getRepository<OrderProduct>(OrderProduct);
		const orderProducts = await orderProductRepo.find({
			where: { orderId: id },
			select: ['id'],
		});
		for (const iterator of orderProducts) {
			await orderProductRepo.remove(iterator);
		}
		return this.orderRepository.delete(id);
	}

	getProductsByOrder(id: number) {
		return this.orderRepository.getProductsByOrder(id);
	}
}
