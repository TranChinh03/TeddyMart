import { Divider, Space, message } from "antd";
import Modal from "antd/es/modal/Modal";
import { ButtonComponent, ButtonSelect, TextInputComponent } from "components";
import { COLORS } from "constants/colors";
import { addData, updateData } from "controller/addData";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "firebaseConfig";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { addNewProduct, updateProduct } from "state_management/slices/productSlice";
import { createID } from "utils/appUtils";

const AddNewProduct = ({
  openAddForm,
  setOpenAddForm,
  data,
  setData,
  isAdd = true,
}: {
  openAddForm: boolean;
  setOpenAddForm: (openAddForm: boolean) => void;
  data?: TProduct;
  setData?: (data: TProduct) => void;
  isAdd?: boolean;
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const GROUP = useSelector((state: RootState) => state.groupProduct);
  const PRODUCT = useSelector((state: RootState) => state.product);
  const GroupOptions = GROUP.map((item) => ({
    ID: item.groupId,
    groupname: item.groupName
  }))

  const onChange = (value: string, fieldName: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [productGroup, setProductGroup] = useState();

  const handleImageSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
        setSelectedImageFile(event.target.files[0])
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onAddNewProduct = async () => {
    if (data.productName === "" || data.groupId === "" || data.groupName === "" || selectedImage === "" || data.cost_price === null || data.sell_price === null) {
      message.error(t("fillData"))
      console.log(data)
      return
    }
    
    if (isAdd) {
      if (
        PRODUCT.findIndex((x) => x.productName === data.productName) !== -1
      ) {
        message.error(t("product.existedProduct"));
        return;
      }
      try {
        const storageRef = ref(
          storage,
          `Product/Images/${createID({ prefix: "P" })}`
        );
          const snapshot = await uploadBytes(storageRef, selectedImageFile);
          data.image = await getDownloadURL(snapshot.ref);
          const ProductID = createID({ prefix: "P"});
          const newProduct: TProduct = {
            productId: ProductID,
            productName: data.productName,
            groupId: data.groupId,
            groupName: data.groupName,
            image: data.image,
            cost_price: data.cost_price,
            sell_price: data.sell_price,
            VAT: data.VAT,
            note: data.note,
          }
          dispatch(addNewProduct(newProduct));
          addData({ data: newProduct, table: "Product", id: ProductID });
          message.success(t("product.addProduct"))
          setOpenAddForm(false)
        }
        catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
      }
    }
    else {
      //Update
        if (selectedImage) {
            const refimg = ref(
              storage,
              data.image
            )
            // Delete the file
            deleteObject(refimg)

            const storageRef = ref(
              storage,
              `Product/Images/${createID({ prefix: "P" })}`
            );
            const snapshot = await uploadBytes(storageRef, selectedImageFile);
            data.image = await getDownloadURL(snapshot.ref);
          }
        dispatch(updateProduct({ currentProduct: data, newProduct: data }));
        await updateData({ data: data, table: "Product", id: data.productId });
        message.success(t("product.editProduct"))
    }
    setOpenAddForm(false);
    setData({
      productId: "",
      productName: "",
      groupId: "",
      groupName: "",
      image: "",
      cost_price: null,
      sell_price: null,
      VAT: null,
      note: "",
    });
    setSelectedImage(null)
  }  

  const backgroundColor = useMemo(
    () =>
      data.productName !== "" && data.groupId !== "" && data.groupName !== "" && selectedImage !== "" && data.cost_price !== null && data.sell_price !== null
        ? COLORS.darkYellow
        : COLORS.defaultWhite,
    [data.productId, data.productName, data.groupId, data.groupName, selectedImage, data.cost_price, data.sell_price]);
  const color = useMemo(
    () =>
      data.productName !== "" && data.groupId !== "" && data.groupName !== "" && selectedImage !== "" && data.cost_price !== null && data.sell_price !== null
        ? COLORS.defaultWhite 
        : COLORS.lightGray,
    [data.productId, data.productName, data.groupId, data.groupName, selectedImage, data.cost_price, data.sell_price]);


  return (
    <Modal
    title={isAdd?<h1 className="text-2xl">{t("product.addNewProduct")}</h1>:<h1 className="text-2xl">{t("product.editProductInfo")}</h1>}
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
            value={data.groupName}
            setValue={(value) => {
              setData({
                ...data,
                groupId: GroupOptions[value].ID,
                groupName: GroupOptions[value].groupname
              })
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
            value={data.productName}
            setValue={(value) => onChange(value, "productName")}
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
            {selectedImage || data.image!=="" ? (
                <img
                src={selectedImage?selectedImage:data.image}
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
          {t("product.price")} <p className="inline-block text-red-600">*</p>
        </label>
        <div className="px-2 mt-2 col-span-3 inline-block">
          <TextInputComponent
              width="100%"
              value={data.cost_price?data.cost_price.toString():""}
              setValue={(value) => onChange(value, "cost_price")}
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
              value={data.sell_price?data.sell_price.toString():""}
              setValue={(value) => onChange(value, "sell_price")}
              required
            />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.VAT")}
        </label>
        <div className="px-2 mt-2 col-span-3 inline-block">
          <TextInputComponent
              width="100%"
              value={data.VAT?data.VAT.toString():""}
              setValue={(value) => onChange(value, "VAT")}
            />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("note")}
        </label>
        <div className="px-2 mt-2 col-span-3 inline-block">
          <TextInputComponent
                width="100%"
                value={data.note}
                setValue={(value) => onChange(value, "note")}
              />
        </div>
      </div>
      <div className="flex mt-10 items-center justify-center">
        <Space>
          <ButtonComponent
            label={t("button.save")}
            backgroundColor={backgroundColor}
            color={color}
            onClick={() => {onAddNewProduct()}}
          />
          <ButtonComponent
            label={t("button.cancel")}
            onClick={() => {
              // setOpenAddForm(false);
              console.log(selectedImage);
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

