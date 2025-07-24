import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProductManagement from "../../components/Management/AdminProduct/ProductManagement/ProductManagement";
import UserManagement from "../../components/Management/AdminUsers/UserManagement/UserManagement";
import StoresManagement from "../../components/Management/AdminStores/StoresManagement/StoresManagement";
import MainTitle from "../../components/Common/Titles/MainTitle/MainTitle";
import OrderButton from "../../components/Buttons/OrderButton/OrderButton";
import "./Management.css";
import Counter from "../../components/Management/Common/Counter/Counter";
import ModalPanel from "../../components/Management/Common/ModalPanel/ModalPanel";
import config from '../../config/env.config';
import { useTranslation } from '../../hooks/useTranslations';
import api from "../../utils/axiosInstance";

export default function Management() {
  const [selectedSection, setSelectedSection] = useState("products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [storeToEdit, setStoreToEdit] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [storeCount, setStoreCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingStores, setLoadingStores] = useState(true);

  useEffect(() => {
    getProducts();
    getUsers();
    getStores();
  }, []);

  const { t } = useTranslation();

  async function getProducts() {
    try {
      setLoadingProducts(true);
      const response = await api.get(`${config.API_URL}/products`);
      setTimeout(() => {
        setProducts(response.data.products);
        setProductCount(response.data.products.length);
        setLoadingProducts(false);
      }, 700);
    } catch (error) {
      console.error(error);
      toast.error(t('management_products_load_error'));
      setLoadingProducts(false);
    }
  }

  async function getUsers() {
    try {
      setLoadingUsers(true);
      const response = await api.get(`${config.API_URL}/users`);

      setTimeout(() => {
        setUsers(response.data.users);
        setUserCount(response.data.users.length);
        setLoadingUsers(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(t('management_users_load_error'));
      setLoadingUsers(false);
    }
  }
  async function getStores() {
    try {
      setLoadingStores(true);
      const response = await api.get(`${config.API_URL}/stores`);

      setTimeout(() => {
        setStores(response.data.stores);
        setStoreCount(response.data.stores.length);
        setLoadingStores(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(t('management_stores_load_error'));
      setLoadingStores(false);
    }
  }

async function deleteProduct(id) {
  try {
    await api.delete(`${config.API_URL}/products/${id}`);

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
      await api.delete(`${config.API_URL}/users/${id}`);

      setUsers(users.filter((user) => user._id !== id));
      setUserCount((prevCount) => prevCount - 1);

      toast.success(t('management_user_delete_success'));
    } catch (error) {
      console.log(error);
      toast.error(t('management_user_delete_error'));
    }
  }

  async function deleteStore(id) {
    try {
      await api.delete(`${config.API_URL}/stores/${id}`);

      setStores(stores.filter((store) => store._id !== id));
      setStoreCount((prevCount) => prevCount - 1);
      
      toast.success(t('management_store_delete_success'));
    } catch (error) {
      console.log(error);
      toast.error(t('management_store_delete_error'));
    }
  }

  return (
    <div className="admin-main-container">
      <div className="admin-layout-header-container">
        <div className="admin-text-container">
          <MainTitle
            text={t("management_page_main_title", {
              section: selectedSection === "products" ? t("management_page_main_title_span1") : selectedSection === "users" ? t("management_page_main_title_span2") : t("management_page_main_title_span3")
            })}
            classAdd="admin-main-title"
            lineHeight={null}
          />

          <div className="admin-product-list">
            <Counter
              text={`${selectedSection === "products"
                  ? `${productCount} ${t('management_page_counter_span1')}`
                  : selectedSection === "users"
                    ? `${userCount} ${t('management_page_counter_span2')}`
                    : `${storeCount} ${t('management_page_counter_span3')}`
                }`}
            />
            <OrderButton
              text={selectedSection === "products" ? t('management_page_btn1') : selectedSection === "users" ? t('management_page_btn2') : t('management_page_btn3')}
              variant="btn-primary"
              variant2="admin-add-product-btn"
              onClick={() => {
                setIsModalOpen(true);
                selectedSection === "products" ? setProductToEdit(null) : selectedSection === "users" ? setUserToEdit(null) : setStoreToEdit(null);
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
            <label className="radio">
              <input type="radio" name="radio" value="stores" checked={selectedSection === "stores"} onChange={() => setSelectedSection("stores")} />
              <span className="name">{t('management_page_table_select3')}</span>
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
          onUpdateProduct={(updatedProduct) => {
            setProducts((prev) =>
              prev.map((p) =>
                p._id === updatedProduct._id ? updatedProduct : p
              )
            );
          }}
          loading={loadingProducts}
        />
      ) : selectedSection === "users" ? (
        <UserManagement
          users={users}
          getUsers={getUsers}
          setUserToEdit={setUserToEdit}
          setIsModalOpen={setIsModalOpen}
          deleteUser={deleteUser}
          loading={loadingUsers}
        />
      ) : (
        <StoresManagement
          stores={stores}
          getStores={getStores}
          setStoreToEdit={setStoreToEdit}
          setIsModalOpen={setIsModalOpen}
          deleteStore={deleteStore}
          loading={loadingStores}
        />
      )}

      {isModalOpen && (
        <ModalPanel
          closeModal={() => setIsModalOpen(false)}
          getData={selectedSection === "products" ? getProducts : selectedSection === "users" ? getUsers : getStores}
          dataToEdit={selectedSection === "products" ? productToEdit : selectedSection === "users" ? userToEdit : storeToEdit}
          selectedSection={selectedSection}
        />
      )}
    </div>
  );
}