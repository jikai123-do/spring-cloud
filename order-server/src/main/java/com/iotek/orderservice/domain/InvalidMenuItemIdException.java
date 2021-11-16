package com.iotek.orderservice.domain;

public class InvalidMenuItemIdException extends RuntimeException {
  public InvalidMenuItemIdException(String menuItemId) {
    super("Invalid menu item id " + menuItemId);
  }
}
