# 🔐 SecureHash - Modern Şifre Hashleme ve Doğrulama Aracı

SecureHash, kullanıcıların metinleri ve şifreleri çeşitli kriptografik algoritmalarla hash'lemesini ve mevcut hash'leri doğrulamasını sağlayan modern, güvenli ve açık kaynaklı bir web uygulamasıdır.

Tüm işlemler **%100 İstemci Taraflı (Client-Side)** gerçekleşir. Girdiğiniz şifreler asla bir sunucuya gönderilmez veya kaydedilmez.

![Proje Ekran Görüntüsü](https://via.placeholder.com/800x450?text=SecureHash+Preview)
*(Buraya daha sonra projenin ekran görüntüsünü ekleyebilirsiniz)*

## ✨ Özellikler

* **⚡ Çoklu Algoritma Desteği:**
    * **Modern:** SHA-256, SHA-384, SHA-512, Bcrypt
    * **Eski (Legacy):** MD5, SHA-1 (Eğitim amaçlı dahil edilmiştir)
* **🔍 Hash Doğrulayıcı (Verifier):** Elinizdeki bir hash değerinin, girdiğiniz şifreyle eşleşip eşleşmediğini kontrol eder (Bcrypt ve diğerleri için uyumlu).
* **🛡️ Tam Güvenlik:** `window.crypto.subtle` API kullanılarak tarayıcı tabanlı şifreleme yapılır.
* **🎨 Modern Arayüz:**
    * Karanlık (Dark) ve Aydınlık (Light) mod desteği.
    * Responsive (Mobil uyumlu) tasarım.
    * Kullanıcı dostu kopyalama ve temizleme araçları.
* **📚 Eğitici İçerik:** Hashleme, tuzlama (salting) ve güvenlik kavramları hakkında bilgilendirici modal içerir.

## 🛠️ Kullanılan Teknolojiler

Bu proje modern web teknolojileri ile geliştirilmiştir:

* **[React 19](https://react.dev/)** - Kullanıcı Arayüzü
* **[TypeScript](https://www.typescriptlang.org/)** - Tip Güvenliği
* **[Vite](https://vitejs.dev/)** - Hızlı Derleme ve Geliştirme
* **[Tailwind CSS](https://tailwindcss.com/)** - Stil ve Tasarım
* **[Lucide React](https://lucide.dev/)** - İkon Seti
* **Kriptografi Kütüphaneleri:** `bcryptjs`, `crypto-js`

## 🚀 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Projeyi Klonlayın:**
    ```bash
    git clone [https://github.com/KULLANICI_ADINIZ/securehash.git](https://github.com/KULLANICI_ADINIZ/securehash.git)
    cd securehash
    ```

2.  **Gerekli Paketleri Yükleyin:**
    ```bash
    npm install
    ```

3.  **Uygulamayı Başlatın:**
    ```bash
    npm run dev
    ```

4.  Tarayıcınızda şu adresi açın: `http://localhost:5173` (veya terminalde belirtilen port).

## ⚠️ Yasal Uyarı

Bu araç **eğitim ve test amaçlı** geliştirilmiştir.
* Lütfen gerçek/aktif olarak kullandığınız hassas şifrelerinizi bu veya herhangi bir çevrimiçi araca girmeyiniz.
* MD5 ve SHA-1 gibi algoritmalar günümüz standartlarında "güvensiz" kabul edilir; sadece karşılaştırma amaçlı eklenmiştir.

## 🤝 Katkıda Bulunma

1.  Bu depoyu Fork'layın.
2.  Yeni bir özellik dalı (branch) oluşturun (`git checkout -b feature/YeniOzellik`).
3.  Değişikliklerinizi yapın ve commit'leyin (`git commit -m 'Yeni özellik eklendi'`).
4.  Dalınızı Push'layın (`git push origin feature/YeniOzellik`).
5.  Bir Pull Request (PR) açın.

---

💻 **Geliştirici:** [Senin Adın/Kullanıcı Adın]
