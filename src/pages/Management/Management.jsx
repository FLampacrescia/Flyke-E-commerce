import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ProductManagement from "../../components/Management/AdminProduct/ProductManagement/ProductManagement";
import UserManagement from "../../components/Management/AdminUsers/UserManagement/UserManagement";
import MainTitle from "../../components/Common/MainTitle/MainTitle";
import OrderButton from "../../components/Buttons/OrderButton/OrderButton";
import "./Management.css";
import Counter from "../../components/Management/Common/Counter/Counter";
import ModalPanel from "../../components/Management/Common/ModalPanel/ModalPanel";
import config from '../../config/env.config';
import { useTranslation } from '../../hooks/useTranslations';

export default function Management() {
  const [selectedSection, setSelectedSection] = useState("products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getProducts();
    getUsers();
  }, []);

  const { t } = useTranslation();

  async function getProducts() {
    try {
      const response = await axios.get(`${config.API_URL}/products`);
      setProducts(response.data.products);
      
      setProductCount(response.data.products.length);
    } catch (error) {
      console.error(error);
      toast.error(t('management_products_load_error'));
    }
  }

  async function getUsers() {
    try {
      const response = await axios.get(`${config.API_URL}/users`);
      setUsers(response.data);
      
      setUserCount(response.data.length);
    } catch (error) {
      console.error(error);
      toast.error(t('management_users_load_error'));
    }
  }

async function deleteProduct(id) {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${config.API_URL}/products/${id}`, {
      headers: {
        ...(token && { access_token: token }),
      },
    });
    setProducts(products.filter((product) => product._id !== id));
    setProductCount((prevCount) => prevCount - 1);
    toast.success(t('management_product_delete_success'));
  } catch (error) {
    console.log(error);
    toast.error(t('management_product_delete_error'));
  }
}
  
  async function deleteUser(id) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${config.API_URL}/users/${id}`, {
      headers: {
        ...(token && { access_token: token }),
      },
    });
      setUsers(users.filter((user) => user._id !== id));
      setUserCount((prevCount) => prevCount - 1);
      toast.success(t('management_user_delete_success'));
    } catch (error) {
      console.log(error);
      toast.error(t('management_user_delete_error'));
    }
  }

  return (
    <div className="admin-main-container">
      <div className="admin-layout-header-container">
        <div className="admin-text-container">
          <MainTitle
            text={t("management_page_main_title", {
              section: selectedSection === "products" ? t("management_page_main_title_span1") : t("management_page_main_title_span2")
            })}
            classAdd="admin-main-title"
            lineHeight={null}
          />

          <div className="admin-product-list">
            <Counter text={`${selectedSection === "products" ? `${productCount} ${t('management_page_counter_span1')}` : `${userCount} ${t('management_page_counter_span2')}`}`} />
            <OrderButton
              text={selectedSection === "products" ? t('management_page_btn1') : t('management_page_btn2')}
              type="btn-primary"
              type2="admin-add-product-btn"
              onClick={() => {
                setIsModalOpen(true);
                selectedSection === "products" ? setProductToEdit(null) : setUserToEdit(null);
              }}
            />
          </div>
        </div>

        <div className="admin-table-select-container">
          <div className="radio-inputs">
            <label className="radio">
              <input type="radio" name="radio" value="products" checked={selectedSection === "products"} onChange={() => setSelectedSection("products")} />
              <span className="name">{t('management_page_table_select1')}</span>
            </label>
            <label className="radio">
              <input type="radio" name="radio" value="users" checked={selectedSection === "users"} onChange={() => setSelectedSection("users")} />
              <span className="name">{t('management_page_table_select2')}</span>
            </label>
          </div>
        </div>
      </div>

      {selectedSection === "products" ? (
        <ProductManagement
          products={products}
          getProducts={getProducts}
          setProductToEdit={setProductToEdit}
          setIsModalOpen={setIsModalOpen}
          deleteProduct={deleteProduct}
        />
      ) : (
        <UserManagement
          users={users}
          getUsers={getUsers}
          setUserToEdit={setUserToEdit}
          setIsModalOpen={setIsModalOpen}
          deleteUser={deleteUser}
        />
      )}

      {isModalOpen && (
        <ModalPanel
          closeModal={() => setIsModalOpen(false)}
          getData={selectedSection === "products" ? getProducts : getUsers}
          dataToEdit={selectedSection === "products" ? productToEdit : userToEdit}
          selectedSection={selectedSection}
        />
      )}
    </div>
  );
}