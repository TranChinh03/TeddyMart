import ButtonComponent from "components/ButtonComponent";
import SearchComponent from "components/SearchComponent";
import SwitchComponent from "components/SwitchComponent/SwitchComponent";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { useState } from "react";
import { CiAlarmOn } from "react-icons/ci";
import CheckboxComponent from "components/CheckBoxComponent";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import {
  addNewPartner,
  updatePartner,
  uploadPartner,
} from "state_management/slices/partnerSlice";
import { Button } from "antd";
import { addDbOrder } from "firebase-tools/addDbOrder";
import { addDbManagerTable } from "firebase-tools/addDbManageTable";
import { addDBPartnerTable } from "firebase-tools/addDbPartnerTable";
import { addDbVoucherTable } from "firebase-tools/addDbVoucherTable";
import { addDbWarehouse } from "firebase-tools/addDbWarehouse";
import { addDBProduct } from "firebase-tools/addDbProduct";
import { addDbGroupProduct } from "firebase-tools/addDbGroupProduct";
import {
  BillTable,
  GroupProductTable,
  ManagerTable,
  PartnerTable,
  ProductTable,
  VoucherTable,
  WareHouseTable,
} from "components/TableComponent";
import ListCheckBox from "components/ListCheckBox";
import GeneralReport from "views/Report/components/GeneralReport";
import GeneralReportTable from "components/TableComponent/components/GeneralReportTable";
import ReportProductTable from "components/TableComponent/components/ReportProductTable";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { addData, addVoucher } from "controller/addData";

export default function Draft() {
  const [isOn, setIsOn] = useState(false);
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const partners = useSelector((state: RootState) => state.partnerSlice);
  const [listFilter, setListFilter] = useState([
    {
      displayName: "Customer Name",
      value: true,
    },
    {
      displayName: "Email",
      value: true,
    },
    {
      displayName: "Phone Number",
      value: true,
    },
    {
      displayName: "Product Name",
      value: true,
    },
    {
      displayName: "Seller Name",
      value: true,
    },
    {
      displayName: "Activities",
      value: true,
    },
  ]);
  //console.log(partners);
  const onCreateAccount = async () => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(
      auth,
      "nguyenthiphuongtien12e@gmail.com",
      "phuongtien"
    )
      .then(() => {
        console.log("sigg up sucessfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex items-center justify-center mt-10 flex-col">
      {/* <SwitchComponent
        label="option1"
        isChecked={isOn}
        setIsChecked={setIsOn}
        labelColor={COLORS.checkbox_bg}
      />
      <TextInputComponent
        icon={<CiAlarmOn />}
        onIconClick={() => console.log("AA")}
        value={value}
        setValue={setValue}
        labelFontWeight={"font-bold"}
        labelFontSize={12}
      />
      <ButtonComponent
        color={COLORS.hover}
        onClick={() => {
          alert("Button clicked!");
          console.log(partners);
          i18n.changeLanguage("vi");
          //dispatch: để gọi actions = setState()
          dispatch(
            addNewPartner({
              partnerId: "AAA",
              partnerName: "AAA",
              email: "1123@gmail.com",
              phoneNumber: "12345678",
              address: "123",
              note: "asass",
              gender: "female",
            })
          );
        }}
        label="Label 1"
        iconLeft={<CiAlarmOn />}
      />
      <ButtonComponent
        color={COLORS.hover}
        onClick={() => {
          alert("Button clicked!");
          //console.log(partners);
          //i18n.changeLanguage("vi");
          //dispatch: để gọi actions = setState()
          dispatch(
            uploadPartner([
              {
                partnerId: "Akkkk",
                partnerName: "AAA",
                email: "1123@gmail.com",
                phoneNumber: "12345678",
                address: "123",
                note: "asass",
                gender: "female",
              },
            ])
          );
        }}
        label="Label 2"
        iconLeft={<CiAlarmOn />}
      />

      <SearchComponent />
      <CheckboxComponent
        color="red"
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      /> */}
      <div>
        <h1>{t("welcome")}</h1>
      </div>

      {/* <Button onClick={addDbManagerTable}>
        <h1>Add Manager Into Database</h1>
      </Button> */}
      {/* <Button onClick={addDBPartnerTable}>
        <h1>Add Partner Into Database</h1>
      </Button>
      <Button onClick={addDbVoucherTable}>
        <h1>Add Voucher Into Database</h1>
      </Button>
      <Button onClick={addDbGroupProduct}>
        <h1>Add Group Product Into Database</h1>
      </Button>
      <Button onClick={addDBProduct}>
        <h1>Add Product Into Database</h1>
      </Button>
      <Button onClick={addDbWarehouse}>
        <h1>Add warehouse Into Database</h1>
      </Button>
      <Button onClick={addDbOrder}>
        <h1>Add Order Into Database</h1>
      </Button>
      <Button
        onClick={() =>
          dispatch({ type: "DELETE_PRODUCT", payload: { data: "AA" } })
        }
      >
        <h1>Extra Reducer</h1>
      </Button>
      <Button>
        <h1>List Checkbox</h1>
      </Button>
      <ListCheckBox listFilter={listFilter} setListFilter={setListFilter} />
      <Button onClick={onCreateAccount}>Create Account</Button> */}
      {/* <BillTable />
      <PartnerTable />
      <ProductTable />
      <WareHouseTable />
      <VoucherTable />
      <ManagerTable />
      <GroupProductTable /> */}
      {/* <GeneralReportTable /> */}
      {/* <ReportProductTable /> */}
      <Button onClick={() => window.localStorage.setItem("userId", "12345")}>
        Add UserId to LocalStorage
      </Button>
      <Button onClick={() => window.localStorage.removeItem("userId")}>
        Remove UserId to LocalStorage
      </Button>
      <Button
        onClick={() => {
          addData({
            data: {
              voucherId: "VCH020",
              discountAmount: 18.75,
              expirationDate: new Date("2023-10-03T00:00:00Z"),
              publicDate: new Date("2023-10-01T00:00:00Z"),
              voucherName: "OctoberKickoff",
            },
            id: "VCH020",
            table: "Voucher",
          });
          addData({
            data: {
              partnerId: "P019",
              partnerName: "Ethan Smith",
              email: "ethan@example.com",
              phoneNumber: "+2345678901",
              address: "111 Elm Avenue, City",
              note: "Regular customer, foodie.",
              gender: "female",
              type: "Customer",
              totalBuyAmount: 0,
              debt: 0,
            },
            id: "P019",
            table: "Partner",
          });
          addData({
            id: "GP001",
            data: {
              groupId: "GP001",
              note: "This group includes a wide range of kitchen appliances designed for modern homes, featuring smart technologies and efficient functionalities to make cooking and kitchen tasks easier and more convenient.",
              groupName: "Kitchen Appliances",
            },
            table: "Group_Product",
          });
          addData({
            id: "PD001",
            table: "Product",
            data: {
              productId: "PD001",
              productName: "Smart Induction Cooktop",
              groupId: "GP001",
              note: "An efficient and smart induction cooktop for modern kitchens.",
              image:
                "https://img.us.news.samsung.com/us/wp-content/uploads/2021/08/09005623/Samsung-Smart-Induction-Built-In-Cooktop-with-Wi-Fi-scaled.jpg",
              cost_price: 150.0,
              VAT: 0.05,
              sell_price: 180.0,
            },
          });
          addData({
            id: "ORD014",
            table: "Orders",
            data: {
              createdAt: new Date(),
              orderId: "ORD014",
              partnerId: "P019",
              partnerName: "Ethan Smith",
              payment: 100000,
              discount: 0,
              totalPayment: 100000,
              status: "paid",
              debt: 0,
              listProduct: [],
              note: "Export to global partners",
              voucherId: "VCH020",
              seller: "Teddy Mart",
              receiver: null,
              type: "Export",
            },
          });
        }}
      >
        Add Voucher
      </Button>
    </div>
  );
}
