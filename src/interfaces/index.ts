import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface InputProps {
    label?: string;
    type: string;
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    defaultValue?: string;
    className?: string;
    wrapperClassName?: string;
}

export interface ButtonProps {
    text?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode;
    className?: string;
}

export interface itemProps {
    icon: string;
    item: string;
    path:string;
}

export interface FormProps<T> {
    logo?: string;
    title: string,
    desc?: string;
    inputs: Array<InputProps>,
    submitBtnText: string;
    setData: React.Dispatch<React.SetStateAction<T>>
    setSubmit?: React.Dispatch<React.SetStateAction<boolean>>
    className?: string;
    DirectionText?: string;
    path?: string;
    linkText?: string;
    textPartClassName?: string;
    submitBtnClassName?: string;
}

export interface loginData {
    email: string,
    password: string,
}

export interface registerData {
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_image: Blob | null;
}

export interface AlertProps {
    show:boolean;
    message: string;
    type: "success" | "error";
    onClose: () => void; 
}

export interface SearchBarProps {
    onSearch: (value: string) => void;
}

export interface Product {
    id: number;
    name: string;
    price: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface ProductCardProps {
    product: Product;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export type ProductCreated = Omit<Product, "id" | "created_at" | "updated_at" | "image_url"> & {
    image: Blob,
    submit?: boolean;
}

export interface DeletePopupProps {
    deletedProduct: Product;
    setDeletedProduct: Dispatch<SetStateAction<Product>>;
    setProducts:Dispatch<SetStateAction<Product[]>>;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface SideBarProps {
    logo: string;
    navBar: ReactNode;
}