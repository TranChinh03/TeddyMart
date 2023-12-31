import { Card, Modal } from "antd";
import { ButtonComponent, TextInputComponent } from "components";
import { COLORS } from "constants/colors";
import { updateData } from "controller/addData";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { updateShelf } from "state_management/slices/shelfSlice";
import { updateShelfWarehouse } from "state_management/slices/warehouseSlice";
type Props = {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  shelf?: TShelf;
  product?: TProduct;
  warehouseName?: string;
};
export default function PlaceOnShelf({
  open,
  setOpen,
  shelf,
  product,
  warehouseName,
}: Props) {
  const { t } = useTranslation();
  const [value, setValue] = useState("0");
  const limit = Math.min(
    product?.quantity,
    +shelf?.capacity - shelf?.currentQuantity
  );
  const warehouses = useSelector((state: RootState) => state.warehouseSlice);
  //console.log("okk", product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (open) setValue(product?.numberOnShelf.toString() ?? "0");
  }, [open]);
  const onSave = async () => {
    let userId = window.localStorage.getItem("USER_ID");
    //console.log(shelf?.currentQuantity + +value);
    //if(shelf?.currentQuantity + +value > shelf)
    dispatch(
      updateShelfWarehouse({
        warehouseName,
        product,
        numberOnShelf: +value,
        userId,
      })
    );
    await updateData({
      data: {
        ...shelf,
        currentQuantity:
          shelf?.currentQuantity + (+value - product?.numberOnShelf),
      },
      table: "Shelf",
      id: shelf?.shelfId,
    });
    dispatch(
      updateShelf({
        currentShelfId: shelf?.shelfId,
        newShelf: {
          ...shelf,
          currentQuantity:
            shelf?.currentQuantity + (+value - product?.numberOnShelf),
        },
      })
    );
    setOpen(false);
  };
  return (
    <Modal
      title={<h1 className="text-2xl">{t("warehouse.arrangeShelf")}</h1>}
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      footer={false}
      width={"40%"}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="overflow-y-auto h-96 w-auto">
        <Card
          bordered={true}
          title={<h1 className="text-md">{t("shelf.shelfInfo")}</h1>}
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <p>{t("shelf.shelfName")}</p>
                </td>
                <td>
                  <p>{shelf?.shelfName}</p>
                </td>
              </tr>
              <tr>
                <td className="pr-8 py-2">
                  <p>{t("shelf.capacity")}</p>
                </td>
                <td>
                  <p className="italic">{shelf?.capacity}</p>
                </td>
              </tr>
              <tr>
                <td className="pr-8 py-2">
                  <p>{t("product.numberOnShelf")}</p>
                </td>
                <td>
                  <p className="italic">
                    {shelf?.currentQuantity + (+value - product?.numberOnShelf)}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card
          bordered={true}
          title={<h1 className="text-md">{t("product.productInfo")}</h1>}
          style={{ marginTop: 10 }}
        >
          <table>
            <tbody>
              <tr>
                <td className="pr-8 py-2">
                  <p>{t("product.productName")}</p>
                </td>
                <td>
                  <p>{product?.productName}</p>
                </td>
              </tr>

              <tr>
                <td className="pr-8 py-2">
                  <p>{t("product.quantity")}</p>
                </td>
                <td>
                  <p className="italic">{product?.quantity}</p>
                </td>
              </tr>

              <tr>
                <td className="pr-8 py-2">
                  <p>{t("product.numberOnShelf")}</p>
                </td>
                {/* <td>
                  <p>{product?.numberOnShelf}</p>
                </td> */}
                <td>
                  <input
                    className="italic"
                    type="number"
                    min="0"
                    max={limit}
                    style={{ maxWidth: 100, alignSelf: "center" }}
                    value={value}
                    onChange={(e) => {
                      // if (+value > 0) {
                      //   setValue(e.target.value);
                      // }
                      setValue(e.target.value);
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td className="pr-8 py-2">
                  <p>{t("product.stock")}</p>
                </td>
                <td>
                  <p className="italic">{product?.quantity - +value}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <div className="flex justify-center gap-x-4 mt-4">
          <ButtonComponent
            label={t("button.save")}
            backgroundColor={COLORS.darkYellow}
            color={COLORS.defaultWhite}
            onClick={onSave}
          />
          <ButtonComponent
            label={t("button.close")}
            backgroundColor={COLORS.defaultWhite}
            color={COLORS.extra_gray}
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
