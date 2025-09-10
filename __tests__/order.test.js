const { Order, Item } = require("../src/order");

describe("Item", () => {
  it("should create an item with id, name, and price", () => {
    const item = new Item(1, "Burger", 10);
    expect(item.id).toBe(1);
    expect(item.name).toBe("Burger");
    expect(item.price).toBe(10);
  });

  it("should throw for invalid price", () => {
    expect(() => new Item(1, "Soda", -5)).toThrow("Invalid price");
    expect(() => new Item(2, "Soda", NaN)).toThrow("Invalid price");
  });
});

describe("Order", () => {
  it("should create an order with default values", () => {
    const order = new Order(1);
    expect(order.id).toBe(1);
    expect(order.items).toEqual([]);
    expect(order.paymentMethod).toBe("cash");
    expect(order.status).toBe("created");
    expect(order.total).toBe(0);
  });

  it("should create an order with specified items and payment method", () => {
    const items = [new Item(1, "Burger", 10), new Item(2, "Fries", 5)];
    const order = new Order(1, items, "card");
    expect(order.items).toEqual(items);
    expect(order.paymentMethod).toBe("card");
    expect(order.total).toBe(15);
  });

  it("should add an item to the order", () => {
    const order = new Order(1);
    const item = new Item(1, "Burger", 10);
    order.addItem(item);
    expect(order.items).toContain(item);
    expect(order.total).toBe(10);
  });

  it("should throw when adding an invalid item", () => {
    const order = new Order(1);
    expect(() => order.addItem(null)).toThrow("Invalid item");
    expect(() => order.addItem({ id: 1, name: "x", price: "10" })).toThrow(
      "Invalid item"
    );
  });

  it("should remove an item from the order", () => {
    const item1 = new Item(1, "Burger", 10);
    const item2 = new Item(2, "Fries", 5);
    const order = new Order(1, [item1, item2]);
    const removed = order.removeItem(1);
    expect(removed).toBe(true);
    expect(order.items).not.toContain(item1);
    expect(order.items).toContain(item2);
    expect(order.total).toBe(5);
  });

  it("removeItem should return false when nothing removed", () => {
    const item1 = new Item(1, "Burger", 10);
    const order = new Order(1, [item1]);
    const removed = order.removeItem(999);
    expect(removed).toBe(false);
    expect(order.items).toContain(item1);
  });

  it("should mark the order as paid", () => {
    const order = new Order(1);
    order.pay();
    expect(order.status).toBe("paid");
  });

  it("should throw an error if trying to pay an already paid order", () => {
    const order = new Order(1);
    order.pay();
    expect(() => order.pay()).toThrow("Order cannot be paid");
  });

  it("should complete a paid order", () => {
    const order = new Order(1);
    order.pay();
    order.complete();
    expect(order.status).toBe("completed");
  });

  it("should throw an error if trying to complete an order that is not paid", () => {
    const order = new Order(1);
    expect(() => order.complete()).toThrow(
      "Order must be paid before it can be completed"
    );
  });

  it("should cancel an order", () => {
    const order = new Order(1);
    order.cancel();
    expect(order.status).toBe("cancelled");
  });

  it("should throw an error if trying to cancel a completed order", () => {
    const order = new Order(1);
    order.pay();
    order.complete();
    expect(() => order.cancel()).toThrow("Completed order cannot be cancelled");
  });
});
