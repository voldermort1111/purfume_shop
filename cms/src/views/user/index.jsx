import Header from "components/Headers/Header";
import PerfumePagination from "components/Pagination";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  Row,
  Table,
} from "reactstrap";

export default function User() {
  return (
    <>
      <Header />
      <Container className="mt--8" fluid>
        <div style={{ marginBottom: 20 }}>
          <Button className="btn-icon btn-3" color="primary" type="button">
            <span className="btn-inner--icon">
              <i className="ni ni-fat-add" />
            </span>
            <span className="btn-inner--text">Thêm mới</span>
          </Button>
        </div>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0"></CardHeader>
              <Table className="align-items-center" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="text-center">
                      STT
                    </th>
                    <th scope="col" className="text-center">
                      Tên
                    </th>
                    <th scope="col" className="text-center">
                      Email
                    </th>
                    <th scope="col" className="text-center">
                      Số điện thoại
                    </th>
                    <th scope="col" className="text-center">
                      Quyền hạn
                    </th>
                    <th scope="col" className="text-center" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td className="text-center">Nguyễn Khánh Duy</td>
                    <td className="text-center">zzz@gmail.com</td>
                    <td className="text-center">0123456789</td>
                    <td className="text-center">USER</td>
                    <td>
                      <Button color="primary" size="sm">
                        <i class="fas fa-edit"></i>
                      </Button>
                      <Button color="danger" size="sm">
                        <i class="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <PerfumePagination totalItem={51} limit={10} />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
