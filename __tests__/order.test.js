/**
 * Testes automatizados para as classes Item e Order
 * Grupo G3 - Cobertura 100% com Jest
 */

const { Order, Item } = require("../src/order");

describe("Item", () => {
  test("deve criar um item com id, nome e preço", () => {
    const item = new Item(1, "Produto Teste", 10.99);
    expect(item.id).toBe(1);
    expect(item.name).toBe("Produto Teste");
    expect(item.price).toBe(10.99);
  });

  test("deve lançar erro para preço inválido", () => {
    expect(() => new Item(1, "Soda", -5)).toThrow("Invalid price");
    expect(() => new Item(2, "Soda", NaN)).toThrow("Invalid price");
  });
});

describe("Order", () => {
  describe("Constructor", () => {
    test("deve criar um pedido com valores padrão", () => {
      const order = new Order(1);
      expect(order.id).toBe(1);
      expect(order.items).toEqual([]);
      expect(order.paymentMethod).toBe("cash");
      expect(order.status).toBe("created");
      expect(order.total).toBe(0);
    });

    test("deve criar um pedido com itens fornecidos e método de pagamento", () => {
      const items = [new Item(1, "Burger", 10), new Item(2, "Fries", 5)];
      const order = new Order(1, items, "card");
      expect(order.items).toEqual(items);
      expect(order.paymentMethod).toBe("card");
      expect(order.total).toBe(15);
    });
  });

  describe("calculateTotal", () => {
    test("deve calcular corretamente o total de todos os itens", () => {
      const items = [
        new Item(1, "Item 1", 10.5),
        new Item(2, "Item 2", 20.3),
        new Item(3, "Item 3", 5.99)
      ];
      const order = new Order(1, items);
      expect(order.total).toBeCloseTo(36.79);
    });

    test("deve retornar 0 quando não houver itens", () => {
      const order = new Order(1);
      expect(order.total).toBe(0);
    });
  });

  describe("addItem", () => {
    test("deve adicionar um item ao pedido e recalcular o total", () => {
      const order = new Order(1);
      const item = new Item(1, "Novo Item", 15.99);
      order.addItem(item);
      expect(order.items).toContainEqual(item);
      expect(order.total).toBe(15.99);
    });

    test("deve adicionar múltiplos itens e calcular o total corretamente", () => {
      const order = new Order(1);
      order.addItem(new Item(1, "Item 1", 10));
      order.addItem(new Item(2, "Item 2", 20));
      expect(order.items.length).toBe(2);
      expect(order.total).toBe(30);
    });

    test("deve lançar erro ao adicionar item inválido", () => {
      const order = new Order(1);
      expect(() => order.addItem(null)).toThrow("Invalid item");
      expect(() => order.addItem({ id: 1, name: "x", price: "10" })).toThrow("Invalid item");
    });
  });

  describe("removeItem", () => {
    test("deve remover um item do pedido e recalcular o total", () => {
      const items = [new Item(1, "Item 1", 10), new Item(2, "Item 2", 15)];
      const order = new Order(1, items);
      const removed = order.removeItem(1);
      expect(removed).toBe(true);
      expect(order.items.length).toBe(1);
      expect(order.items[0].id).toBe(2);
      expect(order.total).toBe(15);
    });

    test("não deve alterar o pedido se o item não for encontrado", () => {
      const items = [new Item(1, "Item 1", 10)];
      const order = new Order(1, items);
      const removed = order.removeItem(999);
      expect(removed).toBe(false);
      expect(order.items).toContain(items[0]);
    });
  });

  describe("pay", () => {
    test("deve marcar o pedido como pago", () => {
      const order = new Order(1);
      order.pay();
      expect(order.status).toBe("paid");
    });

    test("deve lançar erro ao tentar pagar um pedido já pago", () => {
      const order = new Order(1);
      order.pay();
      expect(() => order.pay()).toThrow("Order cannot be paid");
    });
  });

  describe("complete", () => {
    test("deve marcar o pedido como completo quando estiver pago", () => {
      const order = new Order(1);
      order.pay();
      order.complete();
      expect(order.status).toBe("completed");
    });

    test("deve lançar erro ao tentar completar um pedido não pago", () => {
      const order = new Order(1);
      expect(() => order.complete()).toThrow("Order must be paid before it can be completed");
    });
  });

  describe("cancel", () => {
    test("deve cancelar um pedido no estado 'created'", () => {
      const order = new Order(1);
      order.cancel();
      expect(order.status).toBe("cancelled");
    });

    test("deve cancelar um pedido no estado 'paid'", () => {
      const order = new Order(1);
      order.pay();
      order.cancel();
      expect(order.status).toBe("cancelled");
    });

    test("deve lançar erro ao tentar cancelar um pedido completo", () => {
      const order = new Order(1);
      order.pay();
      order.complete();
      expect(() => order.cancel()).toThrow("Completed order cannot be cancelled");
    });
  });
});
