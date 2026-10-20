// Bài 1: tìm kiếm sản phẩm theo tên
const products = [
 {name:'Áo thun nam',price:150000,icon:'👕'},
 {name:'Giày thể thao',price:650000,icon:'👟'},
 {name:'Tai nghe Bluetooth',price:420000,icon:'🎧'},
 {name:'Bàn phím cơ',price:890000,icon:'⌨️'},
 {name:'Chuột không dây',price:250000,icon:'🖱️'},
 {name:'Balo laptop',price:390000,icon:'🎒'}
];
const searchInput = document.getElementById('searchProduct');
if(searchInput){
    const productList=document.getElementById('productList');
    const count=document.getElementById('productCount');
    const noProducts=document.getElementById('noProducts');
    function renderProducts(){
    const keyword=searchInput.value.trim().toLocaleLowerCase('vi');
    const filtered=products.filter(item=>item.name.toLocaleLowerCase('vi').includes(keyword));
    productList.replaceChildren();
    filtered.forEach(item=>{
    const card=document.createElement('article');card.className='product';
    const icon=document.createElement('div');icon.className='symbol';icon.textContent=item.icon;
    const title=document.createElement('h3');title.textContent=item.name;
    const price=document.createElement('p');price.className='price';price.textContent=item.price.toLocaleString('vi-VN')+' ₫';
    card.append(icon,title,price);productList.appendChild(card);
  });
  count.textContent='Tìm thấy '+filtered.length+' sản phẩm';
  noProducts.hidden=filtered.length!==0;
 }
 searchInput.addEventListener('input',renderProducts);renderProducts();
}
// Bài 2: validate và lưu dữ liệu công khai (không lưu mật khẩu)
const form = document.getElementById('registerForm');
if (form) {
    form.addEventListener('submit',function(event){
    event.preventDefault();
    const name=document.getElementById('fullName').value.trim();
    const email=document.getElementById('email').value.trim();
    const password=document.getElementById('password').value;
    const terms=document.getElementById('terms').checked;
    const message=document.getElementById('registerMessage');
    let error='';
    if(!name)error='Vui lòng nhập họ và tên.';
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))error='Email không hợp lệ.';
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password))error='Mật khẩu phải có ít nhất 8 ký tự, chữ hoa, chữ thường và số.';
     else if(!terms)error='Bạn cần đồng ý với điều khoản.';
    if(error){message.textContent=error;message.className='notice error';return;}
    try{
        localStorage.setItem('examDemoUser',JSON.stringify({name:name,email:email}));
        message.textContent='Đăng ký hợp lệ! Đã lưu tên và email vào LocalStorage (bản demo, không tạo tài khoản thật).';
        message.className='notice success';form.reset();
    }catch(e){message.textContent='Không thể lưu LocalStorage. Vui lòng kiểm tra quyền lưu trữ của trình duyệt.';message.className='notice error';}
        });
}
// Bài 3: đếm theo mốc thời gian, luôn dọn interval
const display = document.getElementById('timerDisplay');
if(display){
    const TOTAL=600000;let remaining=TOTAL;let endTime=0;let intervalId=null;
    const status=document.getElementById('timerStatus');
    function clearTick(){if(intervalId!==null){clearInterval(intervalId);intervalId=null;}}
    function draw(){const seconds=Math.ceil(remaining/1000);const m=String(Math.floor(seconds/60)).padStart(2,'0');const s=String(seconds%60).padStart(2,'0');display.textContent=m+':'+s;display.classList.toggle('warning',remaining>0&&remaining<60000);}
    function tick(){remaining=Math.max(0,endTime-Date.now());draw();if(remaining===0){clearTick();status.textContent='Đã hết thời gian!';window.alert('Hết thời gian!');}}
    document.getElementById('startTimer').addEventListener('click',()=>{if(intervalId!==null||remaining===0)return;endTime=Date.now()+remaining;intervalId=setInterval(tick,250);status.textContent='Đồng hồ đang chạy...';tick();});
    document.getElementById('pauseTimer').addEventListener('click',()=>{if(intervalId===null)return;remaining=Math.max(0,endTime-Date.now());clearTick();draw();status.textContent='Đã tạm dừng.';});
    document.getElementById('resetTimer').addEventListener('click',()=>{clearTick();remaining=TOTAL;draw();status.textContent='Đã đặt lại 10 phút.';});
    window.addEventListener('pagehide',clearTick);draw();
}
