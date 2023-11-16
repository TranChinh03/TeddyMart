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
      <Button onClick={addDBPartnerTable}>
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
      {/* <BillTable />
      <PartnerTable />
      <ProductTable />
      <WareHouseTable />
      <VoucherTable />
      <ManagerTable />
      <GroupProductTable /> */}
      {/* <GeneralReportTable /> */}
      {/* <ReportProductTable /> */}
    </div>
  );
}
