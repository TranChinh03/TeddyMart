import { useState, useRef } from 'react';
import ButtonComponent from 'components/ButtonComponent';
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from 'constants/colors';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function FieldCustomer() {
    const [customerName, setCustomerName] = useState("");
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedImageFile = event.target.files[0];
            const imageUrl = URL.createObjectURL(selectedImageFile);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div className="flex justify-center py-16">
            <div className="bg-white border p-5 my-4 rounded-md shadow-md w-fit">
                <h1 className="pr-8 text-3xl">Add New Customer</h1>
                <hr className="h-0.5 my-4 bg-black" />
                <div className="overflow-y-auto max-h-96">
                    <table>
                        <tbody>
                            <tr >
                                <td className="pr-8 py-6">
                                    <p>Supplier Name <span className="text-red-600">*</span></p>
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
                            <tr>
                                <td className="pr-8 py-6">
                                    <p>Certificate</p>
                                </td>
                                <td>
                                    <div
                                        className="flex flex-col items-center border border-gray-300 rounded-lg w-fit h-fit px-10 py-4 cursor-pointer hover:bg-gray-300 active:bg-white"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        {selectedImage ? (
                                            <img src={selectedImage} alt="Selected" style={{ width: '100%', maxHeight: '100%' }} />
                                        ) : (
                                            <div className="flex flex-col items-center" >
                                                <p className="text-6xl font-thin text-gray-400">+</p>
                                                <p className="text-gray-400">Upload Image</p>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleImageSelected}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end gap-x-4 mt-16">
                    <ButtonComponent
                        label="Save"
                        backgroundColor={COLORS.lightGray}
                        onClick={() => alert("Button Clicked")}
                    />
                    <ButtonComponent
                        label="Close"
                        backgroundColor={COLORS.extra_gray}
                        onClick={() => alert("Button Clicked")}
                    />
                </div>

            </div>
        </div>
    );
}
