// Tüm resimleri draggable yap
document.querySelectorAll('.foto').forEach(img => {
  img.setAttribute('draggable', true);

  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

// Tüm boş kutuları droppable yap
document.querySelectorAll('.bolme').forEach(dropZone => {
  dropZone.setAttribute('droppable', true);
  
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.style.backgroundColor = '#d0f0ff';
  });

  dropZone.addEventListener('dragleave', e => {
    dropZone.style.backgroundColor = '';
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.style.backgroundColor = '';


    const imageId = e.dataTransfer.getData('text/plain');
    const draggedImg = document.getElementById(imageId);
    const parentSection = dropZone.closest('.bolmeler');
    const sectionId = parentSection.id;

    if (imageId.startsWith(sectionId)) {
      // doğru yere bırakıldıysa
      dropZone.innerHTML = '';
      dropZone.appendChild(draggedImg);
      draggedImg.style.width = '100%';
      draggedImg.style.height = '100%';
      draggedImg.style.objectFit = 'cover';
    } else {
      // yanlışsa geri gönder
      document.getElementById('.foto').appendChild(draggedImg);
      draggedImg.style.width = '5%';
      draggedImg.style.height = '90%';
    }
  });
});

// Foto kutularını karıştırmak için
window.addEventListener('DOMContentLoaded', () => {
  const bottomBar = document.getElementById('bottom-bar');
  const fotos = Array.from(bottomBar.querySelectorAll('.foto'));

  // Fisher-Yates algoritmasıyla rastgele karıştır
  for (let i = fotos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fotos[i], fotos[j]] = [fotos[j], fotos[i]];
  }

  // Önce temizle, sonra karıştırılmış sırayla ekle
  bottomBar.innerHTML = '';
  fotos.forEach(foto => bottomBar.appendChild(foto));
});