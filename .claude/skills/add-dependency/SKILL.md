---
name: add-dependency
description: Adiciona ou atualiza uma dependência npm seguindo a política de supply chain de docs/security.md (versão exata, 7 dias de publicação, auditoria e checagem do lockfile).
argument-hint: '<pacote>[@versão] [-D] — motivo'
disable-model-invocation: true
---

# Adicionar ou atualizar dependência

Pedido: $ARGUMENTS

A política completa está em `docs/security.md`. Siga os passos na ordem e pare no primeiro que falhar.

## 1. Justificar

Uma frase dizendo por que o pacote é necessário e por que o que já está instalado não resolve. Se der para resolver com o que existe, proponha isso e pare.

## 2. Escolher a versão

```bash
npm view <pacote> time --json
npm view <pacote>@<versão> dist.integrity scripts dependencies
```

- **Regra dos 7 dias**: escolha a versão estável mais recente publicada há 7 dias ou mais. A exceção é correção de vulnerabilidade já divulgada — nesse caso, cite o advisory.
- Se o pacote declarar `preinstall`, `install` ou `postinstall`, **pare e avise**: ele precisará entrar na allowlist de `check-lockfile.mjs`, o que exige revisão do pacote e PR separado.
- Olhe as dependências transitivas que ele traz; muitas dependências novas para pouco ganho é motivo para reconsiderar.

## 3. Instalar

```bash
npm install <pacote>@<x.y.z>        # dependência de runtime
npm install -D <pacote>@<x.y.z>     # dependência de desenvolvimento
```

Sempre versão exata. Nunca alterar `ignore-scripts`. O hook `guard-npm` bloqueia o que fugir disso.

## 4. Verificar

```bash
npm run security:check
npm run check
npm run build
```

Se o `security:check` reprovar, não contorne e não edite a allowlist por conta própria: relate o que ele apontou.

## 5. Relatar para a revisão

Mudanças em `package.json` e `package-lock.json` exigem revisão de outra pessoa (regra 3 de `docs/security.md`). Deixe pronto para o PR:

- pacote, versão e data de publicação;
- motivo;
- pacotes transitivos adicionados (pelo diff do `package-lock.json`);
- resultado do `security:check`.

Commit separado, contendo apenas `package.json` e `package-lock.json`.
