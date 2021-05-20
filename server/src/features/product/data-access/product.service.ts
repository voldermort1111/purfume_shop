import { ProductImage } from './../../../entities/product-image.entity';
import { IProduct } from '@entities/entity-attribute/product.interface';
import { Injectable } from '@nestjs/common';
import { httpConflict } from '@shared/exceptions/http-exception';
import { ProductBodyRequestDto } from './dto/product.dto';
import { IFindProductWhereOptions, ProductRepository } from './product.repository';
import { unlink } from 'fs';
import { Equal, Not } from 'typeorm';

@Injectable()
export class ProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	findAndCountByOptions(options?: IFindProductWhereOptions) {
		return this.productRepository.findAndCountByOptions({ ...options, deletedAt: null });
	}

	findsByOptions(options?: IFindProductWhereOptions) {
		return this.productRepository.findsByOptions({ ...options, deletedAt: null });
	}

	findByIdAndCode(id: number, code: string) {
		return this.productRepository.findOne({ where: { id, code } });
	}

	findById(id: number) {
		return this.productRepository.findOne(id);
	}

	findByIds(ids: number[]) {
		return this.productRepository.findByIds(ids, { loadEagerRelations: false });
	}

	async getSimilar(id: number, groupId: number, rangeId: number, retentionTimeId: number) {
		return this.productRepository.getSimilar(id, groupId, rangeId, retentionTimeId);
	}

	updateQuantity(id: number, quantity: number) {
		return this.productRepository.update(id, { quantity });
	}

	incrementQuantity(id: number, quantity: number) {
		return this.productRepository.increment({ id }, 'quantity', quantity);
	}

	findOneByAttribute(attr: Partial<IProduct>) {
		return this.productRepository.findOne({ where: attr, select: ['id'] });
	}

	delete(id: number) {
		return this.productRepository.update(id, { deletedAt: new Date() });
	}

	async create(data: ProductBodyRequestDto) {
		let _data = await this.productRepository.findOne({ where: { code: data.code } });
		if (_data) {
			return httpConflict('Mã sản phẩm bị trùng!');
		}
		_data = this.productRepository.create(data);
		return this.productRepository.save(_data);
	}

	async update(id: number, data: ProductBodyRequestDto) {
		let _data = await this.productRepository.findOne({ where: { code: data.code } });
		if (_data && _data.id !== id) {
			return httpConflict('Mã sản phẩm bị trùng!');
		}
		return this.productRepository.update(id, data);
	}

	getImages(id: number) {
		const productImageRepo = this.productRepository.getRepository<ProductImage>(ProductImage);
		return productImageRepo.find({ where: { productId: id } });
	}

	getAvatar(id: number) {
		return this.productRepository.findOne(id, {
			select: ['id', 'avatar'],
			loadEagerRelations: false,
		});
	}

	async updateAvatar(id: number, avatar: string) {
		const product = await this.productRepository.findOne(id);
		if (product) {
			if (product.avatar) {
				this.unlinkImage(product.avatar);
			}
		}
		return this.productRepository.update(id, { avatar });
	}

	addImage(id: number, image: string) {
		const productImageRepo = this.productRepository.getRepository<ProductImage>(ProductImage);
		const productIamge = productImageRepo.create({ productId: id, value: image });
		return productImageRepo.save(productIamge);
	}

	async removeImage(id: number) {
		const productImageRepo = this.productRepository.getRepository<ProductImage>(ProductImage);
		const productImage = await productImageRepo.findOne(id);
		if (productImage) {
			this.unlinkImage(productImage.value);
			await productImageRepo.remove(productImage);
		}
	}

	private unlinkImage(image: string) {
		unlink(`./assets/image/${image}`, error => {
			console.log(error);
		});
	}

	getNews() {
		return this.productRepository.getProductsNew();
	}
}
