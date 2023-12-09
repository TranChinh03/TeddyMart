import { Divider, Space, message } from "antd";
import Modal from "antd/es/modal/Modal";
import { ButtonComponent, ButtonSelect, TextInputComponent } from "components";
import { COLORS } from "constants/colors";
import { addData } from "controller/addData";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "firebaseConfig";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { addNewProduct } from "state_management/slices/productSlice";
import { createID } from "utils/appUtils";

const AddNewProduct = ({
  openAddForm,
  setOpenAddForm,
}: {
  openAddForm: boolean;
  setOpenAddForm: (openAddForm: boolean) => void;
}) => {
  const [groupProductID, setGroupProductID] = useState("");
  const [groupProductName, setGroupProductName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(null)
  const [retailPrice, setRetailPrice] = useState(null)
  const [quantity, setQuantity] = useState(null)
  const [VAT, setVAT] = useState(null)
  const [note, setNote] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const GROUP = useSelector((state: RootState) => state.groupProduct);
  const GroupOptions = GROUP.map((item) => ({
    ID: item.groupId,
    groupname: item.groupName
  }))

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [productGroup, setProductGroup] = useState();

  const handleImageSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
        setSelectedImageFile(event.target.files[0])
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
        validateForm("all", "selected")
    }
  };

  const handleInputChange = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    fieldName: string
  ) => {
    setValue(value);
    validateForm(fieldName, value);
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = (fieldName: string, value: string) => {

      // console.log("GroupProductID", groupProductID)
      // console.log("RetailPrice", retailPrice)
      // console.log("Price", price)
      // console.log("Quantity", quantity)
      // console.log("ProductName", productName)
      // console.log(value)

      if(fieldName === "ignore" || selectedImage === null)
        return
      else if (fieldName === "GroupProductID") {
         setIsFormValid(value !== "" && productName !== "" && price !== null && retailPrice !== null && quantity !== null)
      }
      else if (fieldName === "RetailPrice") {
         setIsFormValid(value !== "" && productName !== "" && price !== null && groupProductID !== "" && quantity !== null)
      }
      else if (fieldName === "Price") {
         setIsFormValid(value !== "" && productName !== "" && retailPrice !== null && groupProductID !== "" && quantity !== null)
      }
      else if (fieldName === "Quantity") {
         setIsFormValid(value !== "" && productName !== "" && price !== null && retailPrice !== null && groupProductID !== "")
      }
      else if (fieldName === "ProductName") {
         setIsFormValid(value !== "" && quantity !== null && price !== null && retailPrice !== null && groupProductID !== "")
      }
      else {
         setIsFormValid(productName !== "" && quantity !== null && price !== null && retailPrice !== null && groupProductID !== "")
      }
  };

  const onAddNewProduct = async () => {
    try {
      const storageRef = ref(
        storage,
        `Manager/Product/Images/${createID({ prefix: "P" })}`
      );
        const snapshot = await uploadBytes(storageRef, selectedImageFile);
        const imageUrl = await getDownloadURL(snapshot.ref);
        const ProductID = createID({ prefix: "P"});
        const data: TProduct = {
          productId: ProductID,
          productName: productName,
          groupId: groupProductID,
          groupName: groupProductName,
          image: imageUrl,
          cost_price: price,
          sell_price: retailPrice,
          quantity: quantity,
          VAT: VAT,
          note: note,
        }
        dispatch(addNewProduct(data));
        addData({ data, table: "Product", id: ProductID });
        message.success("Product added successfully!")
        setOpenAddForm(false)
      }
      catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
    }
  }  


  return (
    <Modal
      title={<h1 className="text-2xl">{t("product.addNewProduct")}</h1>}
      width={"60%"}
      open={openAddForm}
      onCancel={() => setOpenAddForm(false)}
      footer={false}
    >
      <Divider style={{ backgroundColor: "black" }} />
      <div className="grid grid-cols-4">
        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.productGroup")}{" "}
          <p className="inline-block text-red-600">*</p>
        </label>
        <div className="col-span-3 inline-block">
          <ButtonSelect
            iconRight={
              <IoMdArrowDown style={{ marginLeft: 50, color: "gray" }} />
            }
            width="100%"
            title="All"
            label={t("group.groupName")}
            value={productGroup}
            setValue={
              (value) => {
                setGroupProductName(GroupOptions[value].groupname)
                handleInputChange(GroupOptions[value].ID, setGroupProductID, "GroupProductID")
              }
            }
            options={GroupOptions.map((item) => item.groupname)}
          />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.productName")}{" "}
          <p className="inline-block text-red-600">*</p>
        </label>
        <div className="px-2 col-span-3 inline-block">
          <TextInputComponent
            width="100%"
            value={productName}
            setValue={(value) => handleInputChange(value, setProductName, "ProductName")}
            required
          />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.productImage")}{" "}
          <p className="inline-block text-red-600">*</p>
        </label>
        <div className="px-2 mt-2 col-span-3 inline-block">
          <div
            onClick={() => fileInputRef.current.click()}
            style={{
              padding: "5px",
              border: "1px solid gray",
              borderRadius: "10px",
              width: "fit-content",
            }}
            className="cursor-pointer m-auto"
          >
            {selectedImage ? (
                <img
                src={selectedImage}
                alt="Selected"
                style={{ width: "100%", maxHeight: "100px" }}
              />
            ) : <img src={require("../../../assets/images/Camera.png")} />}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageSelected}
                />
          </div>
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.quantity")} <p className="inline-block text-red-600">*</p>
        </label>
        <div className="px-2 mt-2 col-span-3 inline-block">
          <TextInputComponent
              width="100%"
              value={quantity}
              setValue={(value) => handleInputChange(value, setQuantity, "Quantity")}
              required
            />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.price")} <p className="inline-block text-red-600">*</p>
        </label>
        <div className="px-2 mt-2 col-span-3 inline-block">
          <TextInputComponent
              width="100%"
              value={price}
              setValue={(value) => handleInputChange(value, setPrice, "Price")}
              required
            />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.sell_price")}{" "}
          <p className="inline-block text-red-600">*</p>
        </label>
        <div className="px-2 mt-2 col-span-3 inline-block">
          <TextInputComponent
              width="100%"
              value={retailPrice}
              setValue={(value) => handleInputChange(value, setRetailPrice, "RetailPrice")}
              required
            />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.VAT")}
        </label>
        <div className="px-2 mt-2 col-span-3 inline-block">
          <TextInputComponent
              width="100%"
              value={VAT}
              setValue={(value) => handleInputChange(value, setVAT, "ignore")}
            />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("note")}
        </label>
        <div className="px-2 mt-2 col-span-3 inline-block">
          <TextInputComponent
                width="100%"
                value={note}
                setValue={(value) => handleInputChange(value, setNote, "ignore")}
              />
        </div>
      </div>
      <div className="flex mt-10 items-center justify-center">
        <Space>
          <ButtonComponent
            label={t("button.save")}
            backgroundColor={
              isFormValid ? COLORS.darkYellow : COLORS.defaultWhite
            }
            color={isFormValid ? COLORS.defaultWhite : COLORS.lightGray}
            onClick={() => {isFormValid?onAddNewProduct() : message.error(t("fillData"))}}
          />
          <ButtonComponent
            label={t("button.cancel")}
            onClick={() => {
              setOpenAddForm(false);
            }}
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              color: "#9A9A9A",
            }}
          />
        </Space>
      </div>
    </Modal>
  );
};

export default AddNewProduct;
function setSelectedImage(imageUrl: string) {
  throw new Error("Function not implemented.");
}

