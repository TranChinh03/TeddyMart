import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

export const VOUCHER = [
  {
    voucherId: "VCH001",
    discountAmount: 10.5,
    expirationDate: "2023-10-10T00:00:00Z",
    publicDate: "2023-10-01T00:00:00Z",
    voucherName: "FallSale10",
  },
  {
    voucherId: "VCH002",
    discountAmount: 15.0,
    expirationDate: "2023-10-15T00:00:00Z",
    publicDate: "2023-10-05T00:00:00Z",
    voucherName: "AutumnSpecial",
  },
  {
    voucherId: "VCH003",
    discountAmount: 20.0,
    expirationDate: "2023-09-30T00:00:00Z",
    publicDate: "2023-09-29T00:00:00Z",
    voucherName: "SeptemberOffer",
  },
  {
    voucherId: "VCH004",
    discountAmount: 18.5,
    expirationDate: "2023-10-07T00:00:00Z",
    publicDate: "2023-10-02T00:00:00Z",
    voucherName: "OctoberSale",
  },
  {
    voucherId: "VCH005",
    discountAmount: 25.0,
    expirationDate: "2023-09-30T00:00:00Z",
    publicDate: "2023-09-28T00:00:00Z",
    voucherName: "EndofSeptember",
  },
  {
    voucherId: "VCH006",
    discountAmount: 12.75,
    expirationDate: "2023-10-14T00:00:00Z",
    publicDate: "2023-10-03T00:00:00Z",
    voucherName: "EarlyOctoberDeal",
  },
  {
    voucherId: "VCH007",
    discountAmount: 30.0,
    expirationDate: "2023-09-28T00:00:00Z",
    publicDate: "2023-09-27T00:00:00Z",
    voucherName: "SeptemberSavings",
  },
  {
    voucherId: "VCH008",
    discountAmount: 22.0,
    expirationDate: "2023-10-20T00:00:00Z",
    publicDate: "2023-10-06T00:00:00Z",
    voucherName: "OctoberDelight",
  },
  {
    voucherId: "VCH009",
    discountAmount: 17.25,
    expirationDate: "2023-09-30T00:00:00Z",
    publicDate: "2023-09-27T00:00:00Z",
    voucherName: "SeptemberDiscount",
  },
  {
    voucherId: "VCH010",
    discountAmount: 28.5,
    expirationDate: "2023-10-05T00:00:00Z",
    publicDate: "2023-10-01T00:00:00Z",
    voucherName: "OctoberPromo",
  },
  {
    voucherId: "VCH011",
    discountAmount: 13.0,
    expirationDate: "2023-10-04T00:00:00Z",
    publicDate: "2023-10-01T00:00:00Z",
    voucherName: "AutumnSale",
  },
  {
    voucherId: "VCH012",
    discountAmount: 19.5,
    expirationDate: "2023-09-29T00:00:00Z",
    publicDate: "2023-09-28T00:00:00Z",
    voucherName: "LastSeptemberDeal",
  },
  {
    voucherId: "VCH013",
    discountAmount: 24.0,
    expirationDate: "2023-10-12T00:00:00Z",
    publicDate: "2023-10-04T00:00:00Z",
    voucherName: "EarlyOctoberSavings",
  },
  {
    voucherId: "VCH014",
    discountAmount: 16.5,
    expirationDate: "2023-09-27T00:00:00Z",
    publicDate: "2023-09-27T00:00:00Z",
    voucherName: "LaunchDaySpecial",
  },
  {
    voucherId: "VCH015",
    discountAmount: 21.0,
    expirationDate: "2023-10-18T00:00:00Z",
    publicDate: "2023-10-07T00:00:00Z",
    voucherName: "OctoberBonanza",
  },
  {
    voucherId: "VCH016",
    discountAmount: 11.25,
    expirationDate: "2023-10-02T00:00:00Z",
    publicDate: "2023-09-30T00:00:00Z",
    voucherName: "WeekendSavings",
  },
  {
    voucherId: "VCH017",
    discountAmount: 26.5,
    expirationDate: "2023-10-10T00:00:00Z",
    publicDate: "2023-10-03T00:00:00Z",
    voucherName: "SpecialOctoberOffer",
  },
  {
    voucherId: "VCH018",
    discountAmount: 14.0,
    expirationDate: "2023-09-29T00:00:00Z",
    publicDate: "2023-09-28T00:00:00Z",
    voucherName: "LastSeptemberSavings",
  },
  {
    voucherId: "VCH019",
    discountAmount: 23.5,
    expirationDate: "2023-10-16T00:00:00Z",
    publicDate: "2023-10-06T00:00:00Z",
    voucherName: "OctoberSpecialDeal",
  },
  {
    voucherId: "VCH020",
    discountAmount: 18.75,
    expirationDate: "2023-10-03T00:00:00Z",
    publicDate: "2023-10-01T00:00:00Z",
    voucherName: "OctoberKickoff",
  },
];
export const addDbVoucherTable = () => {
  VOUCHER.map(async (voucher) => {
    await setDoc(
      doc(
        db,
        "/Manager/0viI4onPd8eJkSC8QZxNUM9mPyX2/Voucher",
        voucher.voucherId
      ),
      voucher
    );
  });
};
