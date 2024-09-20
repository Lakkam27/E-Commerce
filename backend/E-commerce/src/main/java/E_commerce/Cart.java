package E_commerce;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail; // New field for user email

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    private List<CartItem> items;

}
