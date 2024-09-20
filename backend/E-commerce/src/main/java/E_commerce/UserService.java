package E_commerce;

public interface UserService {
    void saveUser(UserDTO userDTO);
    boolean checkUser(LoginDTO loginDTO);
}
