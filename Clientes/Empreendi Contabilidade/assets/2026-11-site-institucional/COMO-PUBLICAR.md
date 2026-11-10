# Como publicar o site da Empreendi na HostGator

O site é estático (HTML + CSS + JS). Não precisa de WordPress, banco de dados nem instalação.
**Este arquivo não precisa ir para o servidor.**

## 0. Antes de começar: hospedagem ativa
1. Entre em https://financeiro.hostgator.com.br e confira se a fatura está paga e o plano está **ativo**.
2. No Portal do Cliente, abra o **cPanel** do plano que tem o domínio `empreendicontabil.com.br`.

## 1. Limpar o que sobrou do WordPress
1. No cPanel, abra **Gerenciador de Arquivos** e entre em `public_html/`.
2. Se ainda houver arquivos do WordPress (`wp-admin`, `wp-content`, `wp-config.php`, `index.php`...), **baixe um backup** antes (selecione tudo → *Compactar* → baixe o .zip) e depois apague.
   - Atenção: se existir um `index.php`, ele pode ter prioridade sobre o `index.html`. Por isso é importante apagar.
3. Se o WordPress foi instalado pelo **Softaculous / "Construtor de sites"**, desinstale por lá para remover também o banco de dados.

## 2. Subir o site
**Opção A, pelo navegador (mais fácil):**
1. No seu computador, entre na pasta `2026-11-site-institucional`, selecione **o conteúdo** dela (`index.html`, `.htaccess` e a pasta `assets`) e compacte em `site.zip`.
   - O `.htaccess` começa com ponto e pode estar oculto no Windows. No Explorer, ative *Exibir → Itens ocultos*.
2. No Gerenciador de Arquivos, dentro de `public_html/`, clique em **Carregar** e envie o `site.zip`.
3. Clique com o botão direito no `site.zip` → **Extract** → extraia em `/public_html`.
4. Confira se o `index.html` ficou **direto** em `public_html/`, e não dentro de uma subpasta. Depois apague o `site.zip`.
5. Em *Configurações* (canto superior direito), marque **Mostrar arquivos ocultos** e confira se o `.htaccess` está lá.

**Opção B, por FTP (FileZilla):** crie uma conta em *cPanel → Contas FTP*, conecte em `ftp.empreendicontabil.com.br` (porta 21) e arraste o conteúdo da pasta para `public_html/`.

## 3. HTTPS (cadeado)
1. No cPanel, abra **SSL/TLS Status** e clique em **Run AutoSSL**. É grátis e pode levar alguns minutos.
2. Quando o certificado estiver ativo, o `.htaccess` passa a mandar tudo para `https://empreendicontabil.com.br`.
   - Se o site der "redirecionamentos demais" antes do SSL ficar pronto, renomeie o `.htaccess` para `_htaccess` temporariamente e volte o nome depois.

## 4. Testar
- Abra o site no celular e no computador (aba anônima) e clique em todos os botões de WhatsApp.
- Teste o compartilhamento em https://www.opengraph.xyz (prévia do link no WhatsApp e redes sociais).
- Meça a velocidade em https://pagespeed.web.dev.

## 5. Google
1. **Google Search Console** (https://search.google.com/search-console): adicione o domínio, verifique pelo DNS (a HostGator tem a *Zona DNS* no cPanel) e peça a indexação da home.
2. **Google Meu Negócio:** confira se o site cadastrado é `https://empreendicontabil.com.br`.

## 6. Dados de contato
Tudo preenchido em 10/11/2026: WhatsApp (62) 98515-5037, empreendicontabil@gmail.com, Instagram @wanessamlemos e CNPJ 62.375.834/0001-39. Não há Facebook nem LinkedIn no site. Para trocar o número do WhatsApp no futuro, substitua `5562985155037` em todo o `index.html` (Ctrl+H no VS Code).

## 7. Atualizar no futuro
Edite os arquivos no VS Code, envie só os arquivos alterados pelo Gerenciador de Arquivos (substituindo) e dê **Ctrl+F5** no navegador.
**Guarde sempre a versão final no Drive ou no Git**: se a hospedagem apagar de novo, é só subir outra vez.
