import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CategoriesAdmin from '../components/CategiriesAdmin';
import ProductsAdmin from '../components/ProductsAdmin';
import UsersAdmin from '../components/UsersAdmin';

function AdminPage() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      style={{ maxWidth: '1000px', margin: '2vh auto 1vh auto' }}
    >
        <Tab eventKey="profile" title="Управление товарами">
            <ProductsAdmin />
        </Tab>
        <Tab eventKey="home" title="Управление пользователями">
            <UsersAdmin />
        </Tab>
        <Tab eventKey="users" title="Управление категориями">
            <CategoriesAdmin />
        </Tab>
    </Tabs>
  );
}

export default AdminPage;