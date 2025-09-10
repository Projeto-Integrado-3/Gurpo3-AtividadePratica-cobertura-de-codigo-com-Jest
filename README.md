# [AP2] Cobertura de código com Jest
### Disciplina: SEGURANÇA, TESTES E VALIDAÇÃO DE SISTEMAS (2025.1)


### Integrantes do Grupo 3
- Rayane Amaro dos Santos - 2023010280
- Valdeilson Bezerra de Lima - 2023010306
- Nome Completo 3 - Matrícula 3

## Objetivo
Implementar testes automatizados usando Jest para o código fornecido, alcançando 100% de cobertura em todas as métricas do Jest (linhas, ramos, funções e instruções).

## Código Testado
O código testado está em `src/order.js` e contém duas classes:
- `Order`: Para gerenciar pedidos de clientes
- `Item`: Para representar itens de um pedido

## Testes Implementados
Implementamos testes completos para as classes `Order` e `Item` em `__tests__/order.test.js`, cobrindo:

1. **Classe Item**:
   - Criação de um item com id, nome e preço

2. **Classe Order**:
   - **Constructor**: Criação com valores padrão, itens fornecidos e método de pagamento específico
   - **calculateTotal**: Cálculo correto do total e pedido sem itens
   - **addItem**: Adição de um ou múltiplos itens
   - **removeItem**: Remoção de item existente e tentativa de remoção de item inexistente
   - **pay**: Marcar pedido como pago e erro ao tentar pagar um pedido que não está no estado 'created'
   - **complete**: Completar um pedido pago e erro ao tentar completar um pedido não pago
   - **cancel**: Cancelar pedidos em diferentes estados e erro ao tentar cancelar um pedido completo

## Como Executar os Testes

```bash
# Instalar dependências
npm install

# Executar testes com cobertura
npm test
```

Todos os testes atingem 100% de cobertura em todas as métricas.

## Instruções Originais

- Clone ou faça fork deste repositório.
- Crie testes automatizados em `__tests__/order.test.js` usando Jest.
- Seu objetivo é atingir 100% de cobertura (linhas, ramos, funções, instruções).
- Submeta os testes via **pull request** para este repositório.
