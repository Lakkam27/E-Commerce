package E_commerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> saveUser(@RequestBody UserDTO userDTO) {
        userService.saveUser(userDTO);
        return new ResponseEntity<>("You are successfully signed up", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> checkUser(@RequestBody LoginDTO loginDTO) {
        boolean flag = userService.checkUser(loginDTO);
        if (flag) {
            return new ResponseEntity<>("You are successfully logged in", HttpStatus.OK);
        }
        return new ResponseEntity<>("Please first try to sign up!", HttpStatus.FORBIDDEN);
    }
}
