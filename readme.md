# Flexor

## Turning Concepts into Compelling Experiences

Flexor dapat dilihat di link https://afintchtr.github.io/
> Ini adalah project akhir pembelajaran Javascript untuk *basic web development* yang ditujukan untuk memenuhi tugas bootcamp BRI - Hacktiv8 untuk path Golang dan Javascript. Pembuatan dan penyesuaian elemen yang terkandung di dalam halaman web ini sama sekali tidak ada unsur komersial dan sepenuhnya ditujukan untuk kepentingan **belajar**.

Berikut merupakan penjelasan *requirement* penugasan.

---
### Kepaduan seluruh halaman
Flexor merupakan sebuah jasa di bidang konsultasi product design. Seluruh laman yang ada pada Flexor dapat dibuka dan berisi hal yang berkaitan dengan desain produk. Sesuai dengan *requirement*, terdapat beberapa laman pada Flexor, yakni sebagai berikut.
- **Home**\
Bagian tubuh halaman utama memuat beberapa section, antara lain Jumbotron yang di dalamnya memuat button untuk menampilkan modal yang berisi pricing dari langganan Flexor, sesuai dengan kriteria penugasan. Section di bawahnya masih terdapat alasan mengapa harus menggunakan Flexor, klien, berbagai macam layanan terkait desain produk, testimoni pelanggan, dan FAQ. Seluruh konten telah disesuaikan dengan jenis jasa dari Flexor itu sendiri, yakni konsultan di bidang product design. 

- **About us**\
Sesuai nama halamannya, bagian ini memuat informasi mengenai Flexor, nilai-nilai yang dijunjung perusahaan, dan juga orang-orang yang terlibat (tentu hanya fiktif belaka).

- **Contact us**\
Halaman ini memuat informasi mengenai bagaimana cara calon klien menghubungi Flexor. Sebagai catatan, mekanisme mengirim email dari form yang ada belum dapat bekerja.

- **Portfolio**\
Halaman ini memuat informasi mengenai produk-produk klien yang sebelumnya telah menjalin kerjasama dengan Flexor (tentu hanya fiktif belaka). Produk yang tercantum berasal dari template Bootstrap.

- **Blog**\
Halaman Blog memuat berbagai macam artikel yang telah tim copywriting dan content creator Flexor rumuskan. Pratinjau konten blog telah disesuaikan agar relevan dengan product design.

- **To do**\
Halaman **To do** merupakan halaman yang khusus dibuat untuk memenuhi kriteria penugasan pada proyek akhir Javascript ini. Konten yang termuat di laman ini, baik *html*, *css*, dan *javascript* dibuat sendiri oleh Author sesuai dengan requirement yang dibutuhkan.\
Fitur yang tersedia di laman ini antara lain to-do item yang memuat title dan description. Setiap item pada to-do list ini dapat dihapus dan ditandai *done* atau selesai. Terdapat fitur tambahan juga di bawahnya, yakni hapus seluruh to-do item dan hapus semua to-do item yang telah ditandai *done*. To-do list yang tampil akan otomatis ter-*render* apabila ada perubahan tanpa harus me-*refresh* halaman.

---
### Kelengkapan bagian halaman
Seluruh halaman yang ada pada web Flexor memiliki struktur yang jelas, yakni terdapat header yang berupa navigation bar seperti aplikasi web pada umumnya yang memiliki tujuan untuk mengakses seluruh halaman yang ada.\
Setelah header terdapat body yang terdiri dari beberapa section tergantung jenis dari halaman tersebut. Terakhir, terdapat footer yang memuat rangkuman informasi dari web Flexor itu sendiri.

---
### Halaman Simple Todo Apps
*Fungsi sudah dijelaskan pada bagian laman to-do di poin pertama di atas*.\
Berikut merupakan tampilan awal halaman to-do.
<br/> \
<img src="https://github.com/afintchtr/bootcamp-final-js-v2/assets/77919010/e2ffb3f7-4f28-490f-a4de-f0737620878e" width="800">
<br/> \
Sedangkan di bawah ini merupakan tampilan to-do-list yang telah diisi 2 item di mana salah satunya memiliki status *done*
<br/> \
<img src="https://github.com/afintchtr/bootcamp-final-js-v2/assets/77919010/934e55ff-6cf7-4b1a-9dea-df72c4b0c6e8" width="800">
<br/> \
Terlihat bahwa di bawah to-do-list terdapat dua button yang memiliki fungsi sesuai dengan tulisan yang termuat di dalamnya. To-do item ini tidak akan hilang meskipun halaman di-*refresh* karena data yang termuat juga ikut dimasukkan ke Local Storage sesuai dengan ketentuan penugasan.

---
### Javascript *special requiremrents*
Sesuai dengan panduan penugasan, berikut merupakan rincian penggunaan syntax Javascript yang menjadi poin plus apabila digunakan dalam pembuatan fungsi-fungsi untuk menjalankan To-do Apps ini.
1. Simbol `==` dan `===` \
Pada file to-do.js baris 43 dan 138 digunakan dua operator tersebut untuk kebutuhan yang berbeda. Pertama untuk mengecek apakah status Done pada sebuah to-do item bernilai false, dan yang kedua untuk mengecek apakah field Title atau Description merupakan string kosong.
```
if (status == false) {
    todoListArray[id].todoDone = true;
    localStorage.setItem("todoList", JSON.stringify(todoListArray));
    box.style.backgroundColor = "#deffe7";
```
```
if (todoValue.title === "" || todoValue.description === "") {
    return;
```

2. Ternary Operator\
Operasi pengganti if statement ini digunakan pada to-do.js baris 18 dan 64. Peruntukkannya hampir sama, yakni untuk mengecek nilai status Done pada to-do item.
```
status
    ? (box.style.backgroundColor = "#deffe7")
    : (box.style.backgroundColor = "#ffffff");
```
```
status == false
    ? (innerActionDone.textContent = "done")
    : (innerActionDone.textContent = "revert?");
```

3. Functions dan Javascript Object\
Kaidah ini tentu banyak ditemukan dalam praktik pembuat program Javascript termasuk dalam proyek ini. Seluruhnya dapat langsung dicek di file to-do.js. Berikut di bawah adalah contoh fungsi untuk menyimpan to-do item yang sebelumnya dibuat di form. 
```
const saveTodo = () => {
  const todoInputTitle = document.getElementById("to-do-title").value;
  const todoInputDescription =
    document.getElementById("to-do-description").value;
  const todoObject = {
    todoId: todoListArray.length + 1,
    todoDone: false,
    todoTitle: todoInputTitle,
    todoDescription: todoInputDescription,
  };
  todoListArray.push(todoObject);
  localStorage.setItem("todoList", JSON.stringify(todoListArray));
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstChild);
  }
  renderTodoList();
};
```
Dapat dilihat juga pada kode di atas, terdapat penggunaan objek bernama todoObject yang memiliki empat properti, yakni id, status done, title, dan description. Kaidah objek dalam Javascript ini digunakan sebagai variabel yang digunakan untuk menampung nilai to-do item

4. Filter function\
Pada project ini, filter pada Javascript digunakan untuk memilah mana to-do item yang memiliki status Done bernilai true dan mana yang false. Hal ini digunakan dalam fungsi yang dijalankan saat button hapus to-do item untuk status Done di-*trigger*. Dapat ditemukan pada file to-do.js baris 176.
```
const formatTodosDone = document.getElementById("format-todos-done");
formatTodosDone.addEventListener("click", () => {
  todoListArray = todoListArray.filter(function (object) {
    return object.todoDone != true;
  });
  localStorage.setItem("todoList", JSON.stringify(todoListArray));
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstChild);
  }
  renderTodoList();
});
```

5. ForEach loop\
Alternatif pengganti loop biasa yang sering digunakan untuk menjalankan loop sebanyak jumlah item dalam suatu container ini juga digunakan pada project kali ini dalam menampilkan seluruh to-do item yang tersimpan dalam array of object yang tersimpan dalam Local Storage. Dapat ditemukan pada file to-do.js baris 105.
```
const renderTodoList = () => {
  todoListArray.forEach((element, idx) => {
    createTodoElement(
      idx,
      element.todoDone,
      element.todoTitle,
      element.todoDescription
    );
  });
};
```

Ini adalah akhir dari dokumentasi *static web development* Flexor. Terima kasih kepada seluruh pihak yang terlibat, utamanya pembimbing dari Hacktivt8 path Golang and Javascript, serta pihak BootstrapMade yang menyediakan template landing page menggunakan Bootstrap secara gratis.

***

Credit to:

Template Name: Flexor\
Template URL: https://bootstrapmade.com/flexor-free-multipurpose-bootstrap-template/ \
Author: BootstrapMade.com\
License: https://bootstrapmade.com/license/
