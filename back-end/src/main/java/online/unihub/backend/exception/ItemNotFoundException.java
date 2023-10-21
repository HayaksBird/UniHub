package online.unihub.backend.exception;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(Class<?> itemClass, Object val) {
        super(String.format("An item %s with value %s does not exist!", itemClass, val));
    }
}
