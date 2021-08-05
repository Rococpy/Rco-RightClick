/* Rco Right Clock Js 1.6.4
Copyright 2019 - 2021 Rococpy All rights reserved.*/
const Rco__version = "1.6.4"

function copyToClipboard(val) {
	let t = document.createElement("textarea");
	document.body.appendChild(t);
	t.value = val;
	t.select();
	document.execCommand('copy');
	document.body.removeChild(t);
}

const Rco__Right = {
	version: "",
	changelog: "",
	url:"",
	copy:"",

	hook(){
		Rco__urls.map(v => { return Rco__Right.url += `<li onclick="location.href='${v[1]}'">${v[0]}(으)로 이동</li>`; })
		$.get({url: 'https://cdn.rococpy.com/version/rightclick.json', cache: false}, (data) => {

			Rco__Right.version = data['version'];
			Rco__Right.changelog = data['changelog'];
		}).fail(_ => {
			console.error("[Rco RightClick] Opps!Failed to fetch version information from rococpy server!")

			Rco__Right.version = "0.0.0";
			Rco__Right.changelog = "서버에서 새로운 변경사항을 조회하지 못했습니다.\\nOffline Mode";
		});

		$('head').append(`<style>
.Rco__right ul{
	margin: 0;
	padding-left: 0;
	list-style: none;
}
.Rco__right hr{
	margin:0;
}
.Rco__right{
	text-transform: inherit;
	box-sizing: border-box;
	position: fixed;
	border: 1px solid lightgray;
	background: white;
	padding: 10px;
	z-index: 99999999999999;
	width: 250px; 
	border-radius: 10px;
	transform: scale(0.9);
	transition: 0.2s all;
	opacity: 0;
}

.Rco__right li{
	line-height: inherit!important;
	letter-spacing: 0.0em;
	font-family:Malgun Gothic;
	position: relative;
	cursor: pointer;
	padding: 10px;
	font-size:15px;
}

.Rco__right li:before{
	content: " ";
	width: 0%;
	left: 0;
	top: 0;
	background: lightgray;
	height: 100%;
	z-index: -1;
	transition: 0.3s all;
	position: absolute;
}
.Rco__right li:after{
	content: " ";
	width: 0%;
	left: 0;
	top: 0;
	background: darkgray;
	height: 100%;
	z-index: -1;
	position: absolute;
}

.Rco__right li:hover:before{
	width: 100%;
}

.Rco__right li:active:after{
	transition: 0.2s all;
	width: 100%;
}

.Rco__right_modal{
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	z-index:9999999999999999999999999999;
}

.Rco__right_modal_content{
	position:absolute;
	top:50%;
	left:50%;
	transform: translate(-50%, -50%);
	text-align:center;
}

.Rco__right_modal_content img{
	max-width: 500px;
	max-height: 500px;
	width: 100%;
}

.Rco__right_modal_background{
	position:absolute;
	top:0
	left:0;
	width:100%;
	height:100%;
	background: rgba(0,0,0,0.5);
	z-index: -1;
}

</style>`)
		$(document)
			.on("click", ".Rco__right_modal_background", _ => $(".Rco__right_modal").remove())
			.on('click', (e) => { if (e.target.className !== "Rco__right") return Rco__Right.clear(); })
			.on('contextmenu', (e) => {
				e.preventDefault();
	
				Rco__Right.open(e.clientX, e.clientY, e);
			})
	},

	open(x, y, e){
		Rco__Right.copy = window.getSelection().type == "Range" ? window.getSelection().getRangeAt(0).toString() : ""

		$(".Rco__right").remove();
		$('body').append(`<div class="Rco__right">
			<ul>
				<li onclick="history.back()">이전 페이지</li>
				<li onclick="history.forward()">다음 페이지</li>
				<li onclick="location.reload()">새로고침</li>
				<hr>
				<li onclick="copyToClipboard(location.href)">현재 페이지 URL 복사</li>
				<li onclick="Rco__Right.openmodal(location.href)">현재 페이지의 QR 생성</li>
				${e.target.href !== "" && e.target.href !== undefined
				? `<hr><li onclick="copyToClipboard('${e.target.href}')">링크 복사</li>
				<li onclick="window.open('${e.target.href}')">새 탭에서 링크 열기</li>
				<li onclick="Rco__Right.openmodal('${e.target.href}')">이 링크의 QR 생성</li>`
				: ""}
				${e.target.currentSrc ? `<hr><li onclick="copyToClipboard('${e.target.currentSrc}')">이미지 링크 복사</li>
				<li onclick="window.open('${e.target.currentSrc}')">새 탭에서 이미지 열기</li>
				<li onclick="Rco__Right.openmodal('${e.target.currentSrc}')">이 이미지의 QR 생성</li>` : ""}
				<hr>
				${Rco__Right.copy !== "" ? `<li onclick="copyToClipboard(Rco__Right.copy)">선택한 텍스트 복사</li><hr>` : ""}
				${Rco__Right.url}
				<hr>
				<li onclick="setTimeout(_ =>{ alert('${Rco__Right.changelog}')}, 10)">Change Log</li>
				<li onclick="setTimeout(_ =>{ alert('Rco Right Clock Js\\nVersion: ${Rco__version} | Lasted: ${Rco__Right.version}${Rco__Right.version == "0.0.0" ? "\\n\\n서버에서 새로운 버전을 조회하지 못했습니다.\\nOffline Mode" : Rco__Right.version > Rco__version ? "\\n새로운 버전이 나왔습니다!" : Rco__Right.version < Rco__version ? "\\n\\n이 애드온은 손상되었습니다!\\n누군가에 의해 임의로 수정됬을 수 있습니다!\\nhttps://project.rococpy.com/rightclick에서 새로 다운로드 하십시오!" :  ""} \\n\\nCopyright Rococpy')}, 10)">정보</li>
			</ul>
		</div>`)

		x = x > $(window).width() - 260 ? $(window).width() - 260 : x;
		y = y > $(window).height() - ($(".Rco__right").height() + 22) ? $(window).height() - ($(".Rco__right").height() + 30) : y;

		$(".Rco__right").css({"top": y, "left": x}).css({"transform": "scale(1.0)", "opacity": "1", "box-shadow": "0px 0px 8px gray"});
	},

	clear(){
		$(".Rco__right").css({"transform": "scale(0.9)", "opacity": "0", "box-shadow": "none"});
		setTimeout(() => {
			$(".Rco__right").remove();
		}, 201)
	},

	openmodal(url){
		$("body").append(`<div class="Rco__right_modal">
			<div class="Rco__right_modal_content">
				<img src="https://chart.googleapis.com/chart?chs=500x500&cht=qr&choe=UTF-8&chl=${url}">
			</div>
			<div class="Rco__right_modal_background"></div>`)
	}
}

$(_ => {
	Rco__Right.hook()
})
