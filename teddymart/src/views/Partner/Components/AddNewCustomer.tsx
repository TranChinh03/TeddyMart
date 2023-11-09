import { useState, useRef } from 'react';
import ButtonComponent from 'components/ButtonComponent';
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from 'constants/colors';

export default function FieldCustomer() {
    const [customerName, setCustomerName] = useState("");
    return (
        <div className="flex justify-center">
            <div className="bg-white border p-5 my-4 rounded-md shadow-md w-fit">
                <h1 className="pr-8 text-3xl">Add New Customer</h1>
                <hr className="h-0.5 my-4 bg-black" />

                <table>
                    <tbody>
                        <tr >
                            <td className="pr-8 py-6">
                                <p>Customer Name <span className="text-red-600">*</span></p>
                            </td>
                            <td>
                                <TextInputComponent
                                    placeHolder=''
                                    width={492}
                                    value={customerName}
                                    setValue={setCustomerName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-8 py-6">
                                <p>Phone Number<span className="text-red-600">*</span></p>
                            </td>
                            <td>
                                <TextInputComponent
                                    placeHolder=''
                                    width={492}
                                    value={customerName}
                                    setValue={setCustomerName}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="pr-8 py-6">
                                <p>Gender</p>
                            </td>
                            <td>
                                <input type="radio" name="radio-gender" className="w-4 h-4 mr-4" />
                                <label className="mr-16">Male</label>
                                <input type="radio" name="radio-gender" className=" w-4 h-4 mr-4" />
                                <label className="mr-16">Female</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-8 py-6">
                                <p>Email</p>
                            </td>
                            <td>
                                <TextInputComponent
                                    placeHolder=''
                                    width={492}
                                    value={customerName}
                                    setValue={setCustomerName}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="pr-8 py-6">
                                <p>Address</p>
                            </td>
                            <td>
                                <TextInputComponent
                                    placeHolder=''
                                    width={492}
                                    value={customerName}
                                    setValue={setCustomerName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-8 py-6">
                                <p>Total Buy Amount</p>
                            </td>
                            <td>
                                <TextInputComponent
                                    placeHolder=''
                                    width={492}
                                    value={customerName}
                                    setValue={setCustomerName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-8 py-6">
                                <p>Debt</p>
                            </td>
                            <td>
                                <TextInputComponent
                                    placeHolder=''
                                    width={492}
                                    value={customerName}
                                    setValue={setCustomerName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-8 py-6">
                                <p>Note</p>
                            </td>
                            <td>
                                <TextInputComponent
                                    placeHolder=''
                                    width={492}
                                    value={customerName}
                                    setValue={setCustomerName}
                                />
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="flex justify-end gap-x-4 mt-4">
                    <ButtonComponent
                        label="Save"
                        backgroundColor={COLORS.defaultWhite}
                        color={COLORS.lightGray}
                        onClick={() => alert("Button Clicked")}
                    />
                    <ButtonComponent
                        label="Close"
                        backgroundColor={COLORS.defaultWhite}
                        color={COLORS.extra_gray}
                        onClick={() => alert("Button Clicked")}
                    />
                </div>

            </div>
        </div>
    );
}
