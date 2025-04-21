export declare class LoginDto {
    readonly email: string;
    readonly password: string;
}
export declare class SignupDto {
    name: string;
    email: string;
    telephone: string;
    password: string;
}
export declare class UpdatePasswordDto {
    new_password: string;
    old_password: string;
}
export declare class UpdateProfileDto {
    name: string;
    surname: string;
    telephone: string;
    address: string;
    description: string;
    logo: string;
}
