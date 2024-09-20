package E_commerce;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserEmail(String userEmail);
}
