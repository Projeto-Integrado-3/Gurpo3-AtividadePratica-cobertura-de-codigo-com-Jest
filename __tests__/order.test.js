/**
* Esse trabalho é do grupo G3
*/

const { Order, Item } = require("../src/order");

describe("Item", () => {
  test("deve criar um item com id, nome e preço", () => {
    const item = new Item(1, "Produto Teste", 10.99);
    expect(item.id).toBe(1);
    expect(item.name).toBe("Produto Teste");
    expect(item.price).toBe(10.99);
  });
});

describe("Order", () => {
  // Testes para o construtor
  describe("Constructor", () => {
    test("deve criar um pedido com valores padrão", () => {
      const order = new Order(1);
      expect(order.id).toBe(1);
      expect(order.items).toEqual([]);
      expect(order.paymentMethod).toBe("cash");
      expect(order.status).toBe("created");
      expect(order.total).toBe(0);
    });

    test("deve criar um pedido com itens fornecidos", () => {
      const items = [
        new Item(1, "Item 1", 10),
        new Item(2, "Item 2", 15)
      ];
      const order = new Order(1, items);
      expect(order.items).toEqual(items);
      expect(order.total).toBe(25);
    });

    test("deve criar um pedido com método de pagamento específico", () => {
      const order = new Order(1, [], "credit");
      expect(order.paymentMethod).toBe("credit");
    });
  });

  // Testes para calculateTotal
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

  // Testes para addItem
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
  });

  // Testes para removeItem
  describe("removeItem", () => {
    test("deve remover um item do pedido e recalcular o total", () => {
      const items = [
        new Item(1, "Item 1", 10),
        new Item(2, "Item 2", 15)
      ];
      const order = new Order(1, items);
      order.removeItem(1);
      expect(order.items.length).toBe(1);
      expect(order.items[0].id).toBe(2);
      expect(order.total).toBe(15);
    });

    test("não deve alterar o pedido se o item não for encontrado", () => {
      const items = [
        new Item(1, "Item 1", 10),
        new Item(2, "Item 2", 15)
      ];
      const order = new Order(1, items);
      order.removeItem(3); // Item não existe
      expect(order.items.length).toBe(2);
      expect(order.total).toBe(25);
    });
  });

  // Testes para pay
  describe("pay", () => {
    test("deve marcar o pedido como pago", () => {
      const order = new Order(1);
      order.pay();
      expect(order.status).toBe("paid");
    });

    test("deve lançar erro ao tentar pagar um pedido que não está no estado 'created'", () => {
      const order = new Order(1);
      order.pay(); // Primeiro pagamento - status muda para "paid"
      expect(() => {
        order.pay(); // Tentativa de segundo pagamento
      }).toThrow("Order cannot be paid");
    });
  });

  // Testes para complete
  describe("complete", () => {
    test("deve marcar o pedido como completo quando estiver pago", () => {
      const order = new Order(1);
      order.pay();
      order.complete();
      expect(order.status).toBe("completed");
    });

    test("deve lançar erro ao tentar completar um pedido que não está pago", () => {
      const order = new Order(1);
      expect(() => {
        order.complete();
      }).toThrow("Order must be paid before it can be completed");
    });
  });

  // Testes para cancel
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
      expect(() => {
        order.cancel();
      }).toThrow("Completed order cannot be cancelled");
    });
  });
});
