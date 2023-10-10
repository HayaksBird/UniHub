package online.unihub.backend.exception;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(Class<?> itemClass, int id) {
        super(String.format("An item %s with id %s does not exist!", itemClass, id));
    }
}
