import { jwtDecode } from "jwt-decode";

export function decodeToken() {
    const token = localStorage.getItem("accessToken");
    try {
        if (token) {
            const decodedToken = jwtDecode(token);
            return decodedToken || null;
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}
