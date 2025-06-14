import { useEffect, useMemo, useState } from "react";
import BreadCrumbs from "../reusables/BreadCrumbs";
import {
  useDeleteItemMutation,
  useGetItemQuery,
  usePostItemMutation,
  useUpdateItemMutation,
} from "../app/services/QuerySlice";
import { Form, Modal, Popconfirm, Table, message } from "antd";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import CustomButton from "../reusables/CustomButton";
import { RxPlus } from "react-icons/rx";
import CustomModal from "../reusables/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { useClientContext } from "../context/ClientContext";
import {
  addUser,
  deleteUser,
  setUsers,
  updateUser,
  userInfo,
} from "../app/UserSlice";
import InputField from "../reusables/InputField";
import { FaCircleUser } from "react-icons/fa6";

const Dashboard = () => {
  const {
    data: usersData,
    isLoading,
    error,
  } = useGetItemQuery({ url: "/users" });
  console.log("data:", usersData);
  const dispatch = useDispatch();
  const { user_details, users } = useSelector((state) => state.users_slice);

  //console.log("user slice:", user_details);

  const { showModal, handleOk, handleCancel, confirmLoading, open } =
    useClientContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");

  const [deleteItem] = useDeleteItemMutation();
  const [postItem] = usePostItemMutation();
  const [updateItem] = useUpdateItemMutation();

  useEffect(() => {
    if (usersData) {
      dispatch(setUsers(usersData));
    }
  }, [usersData]);

  const filteredUsers = useMemo(() => {
    if (!users || users.length === 0) return [];

    return users?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, users]);

  if (isLoading) return <p className=" text-center">Loading users...</p>;
  if (error) return <p className=" text-center">Error loading users!</p>;

  const handleUserDetails = (user) => {
    dispatch(userInfo(user));
    showModal();
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem({ url: `/users/${id}` });
      dispatch(deleteUser(id));
      message.success(<p className=" caption">User deleted Successfully</p>);
    } catch (err) {
      message.error(<p className=" caption">Failed to delete user</p>);
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const openEditModal = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingUser) {
        await updateItem({
          url: `/users/${editingUser.id}`,
          data: values,
        });
        dispatch(updateUser({ id: editingUser.id, data: values }));

        message.success(<p className="caption">User updated successfully</p>);
      } else {
        const newUser = { ...values, id: Date.now() };
        await postItem({
          url: "/users",
          data: newUser,
        });
        dispatch(addUser(newUser));

        message.success(<p className="caption">User added successfully</p>);
      }

      setModalVisible(false);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Company", dataIndex: ["company", "name"] },
    {
      title: <div className="text-center w-full font-heading">Action</div>,
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <div className="flex items-center gap-4 text-lg text-gray-600 justify-center">
          <button
            onClick={() => handleUserDetails(record)}
            title="View"
            className="bg-gray-100 p-2 rounded-full text-neutral-500 border border-gray-200 "
          >
            <IoIosEye className="text-[1.2rem]" />
          </button>
          <button
            onClick={() => openEditModal(record)}
            title="Edit"
            className=" bg-gray-100 p-2 rounded-full text-blue-400 border border-gray-200"
          >
            <MdEdit className="text-[1.2rem]" />
          </button>
          <Popconfirm
            title={
              <p className="caption">
                Are you sure you want to delete this user?
              </p>
            }
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            placement="top"
          >
            <button
              title="Delete"
              className="bg-gray-100 p-2 rounded-full text-rose-600 border border-gray-200"
            >
              <MdDeleteForever className=" text-[1.2rem]" />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <section>
      <BreadCrumbs
        title={"User Management Dashboard"}
        parent={"Dashboard"}
        childpath={"User Management"}
      />
      <section className=" flex gap-8 justify-between items-center  ml-auto  mt-[2.5rem] mb-[1rem]">
        <div className="w-[25%] relative  ">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="w-full px-3 py-[10px] border-2 bg-white border-gray-200 rounded-full caption focus:outline-none"
            placeholder="Search "
          />
          <BiSearch className="absolute right-2.5 top-[11px] text-[1.5rem] text-gray-300" />
        </div>
        <CustomButton
          icon={<RxPlus />}
          invert_icon
          width={"w-fit"}
          type="button"
          onClick={openAddModal}
        >
          ADD USER
        </CustomButton>
        <CustomModal
          handleOk={handleOk}
          open={open}
          confirmLoading={confirmLoading}
          handleCancel={handleCancel}
        >
          {user_details ? (
            <section className="items-center flex flex-col lg:flex-row gap-5 justify-between p-2 ">
              <div className=" lg:w-[40%]">
                <FaCircleUser className="text-[4rem] text-neutral-400 mx-auto" />
                <h6 className="font-[700] tracking-[0.4px] text-center mt-[1rem]">
                  {user_details.name}
                </h6>
              </div>
              <div className="space-y-3.5 lg:flex-1">
                <div className="border-b-2 border-gray-200 pb-3">
                  <p className="caption mb-1">Email:</p>
                  <p className="text-wrap font-heading">{user_details.email}</p>
                </div>
                <div className="border-b-2 border-gray-200 pb-3">
                  <p className="caption mb-1">Company:</p>
                  <p className=" font-heading">{user_details.company?.name}</p>
                </div>
                <div>
                  <p className="caption mb-1">Phone:</p>
                  <p className="font-heading">{user_details.phone}</p>
                </div>
              </div>
            </section>
          ) : (
            <p>No user selected</p>
          )}
        </CustomModal>

        <Modal
          title={editingUser ? "Edit User" : "Add User"}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={() => form.submit()}
          okText={editingUser ? "Update" : "Add"}
          forceRender
        >
          <section className=" p-3">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              className=" grid grid-cols-2 gap-x-4 !font-body"
            >
              <InputField
                name={"name"}
                label={"Name"}
                placeholder={"Name"}
                rules={[{ required: true, message: "Please input name" }]}
              />

              <InputField
                placeholder={"Email"}
                name="email"
                label="Email"
                rules={[
                  { required: true, type: "email", message: "Invalid email" },
                ]}
              />
              <InputField
                placeholder="Phone"
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Please input phone" }]}
              />
              <InputField
                name={["company", "name"]}
                label="Company Name"
                rules={[
                  { required: true, message: "Please input company name" },
                ]}
              />
            </Form>
          </section>
        </Modal>
      </section>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        className=" font-body"
      />
    </section>
  );
};

export default Dashboard;
