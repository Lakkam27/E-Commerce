package E_commerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart addToCart(CartItem cartItem) {
        Cart cart = cartRepository.findByUserEmail(cartItem.getUserEmail());
        if (cart == null) {
            cart = new Cart();
            cart.setUserEmail(cartItem.getUserEmail());
            cart.setItems(new ArrayList<>());
        }
        cart.getItems().add(cartItem);
        return cartRepository.save(cart);
    }

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Optional<Cart> getCart(Long id) {
        return cartRepository.findById(id);
    }
}
