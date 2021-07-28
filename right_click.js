/* Rco Right Clock Js 1.4.1*/
const dd = console.log
const version = "1.4.1"
const changelog = "<style> move to <head>"

function copyToClipboard(val) {
  let t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = val;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
}

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

const Right = {
	version:"",
	url:"",
	copy:"",
	hook(){
		urls.map((v, e) => { return Right.url += `<li onclick="location.href='${v[1]}'">${v[0]}(으)로 이동</li>`; })
		$.getJSON('https://cdn.rococpy.com/version/rightclick.json', (data) => {
			Right.version = data['version'];
		});
		$('head').append(`<style>
.ri_gh_t ul{
	margin: 0;
  padding-left: 0;
	list-style: none;
}
.ri_gh_t hr{
	margin:0;
}
.ri_gh_t{
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

.ri_gh_t li{
	line-height: inherit!important;
	letter-spacing: 0.0em;
	font-family:Malgun Gothic;
	position: relative;
	cursor: pointer;
	padding: 10px;
	font-size:15px;
}

.ri_gh_t li:before{
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
.ri_gh_t li:after{
	content: " ";
	width: 0%;
	left: 0;
	top: 0;
	background: darkgray;
	height: 100%;
	z-index: -1;
	position: absolute;
}

.ri_gh_t li:hover:before{
	width: 100%;
}
.ri_gh_t li:active:after{
	transition: 0.2s all;
	width: 100%;
}</style>`)
		$(document)
			.on('mouseup', (e) => {
				if ((event.button == 2) || (event.which == 3)) {
					x = event.clientX;
   				y = event.clientY; 
   				Right.open(x, y, e);
  			} else if (e.target.className !== "right rmain") return Right.clear();
			})
			.on('contextmenu', () => { return false; });
	},
	open(x, y, e){
		Right.copy = window.getSelection().type == "Range" ? window.getSelection().getRangeAt(0).toString() : ""

		$(".rmain, .rsub").remove();
		$('body').append(`<div class="ri_gh_t rmain">
			<ul>
				<li onclick="history.back()">이전 페이지</li>
				<li onclick="history.forward()">다음 페이지</li>
				<li onclick="location.reload()">새로고침</li>
				<hr>
				<li onclick="copyToClipboard(location.href)">현재 페이지 URL 복사</li>
				<li onclick="alert('개발 중 입니다!')">현재 URL을 QR로</li>
				
				${e.target.href !== "" && e.target.href !== undefined
				? `<hr><li onclick="copyToClipboard('${e.target.href}')">링크 복사</li>
				<li onclick="openInNewTab('${e.target.href}')">새 탭에서 링크 열기</li>
				<li onclick="window.open('${e.target.href}')">새 창에서 링크 열기</li>`
				: ""}
				${e.target.currentSrc ? `<hr><li onclick="copyToClipboard('${e.target.currentSrc}')">이미지 링크 복사</li>
				<li onclick="openInNewTab('${e.target.currentSrc}')">새 탭에서 이미지 열기</li>` : ""}
				<hr>
				${Right.copy !== "" ? `<li onclick="copyToClipboard(Right.copy)">선택한 텍스트 복사</li><hr>` : ""}
				${Right.url}
				<hr>
				<li onclick="setTimeout(() =>{alert('${changelog}')}, 10)">Change Log</li>
				<li onclick="setTimeout(() =>{alert('Rco Right Clock Js\\nVersion: ${version} | Lasted: ${Right.version}${Right.version > version ? "\\n새로운 버전이 나왔습니다!" : Right.version < version ? "\\n\\n이 애드온은 손상되었습니다!\\n누군가에 의해 임의로 수정됬을 수 있습니다!\\nhttps://project.rococpy.com/rightclick에서 새로 다운로드 하십시오!" : ""} \\n\\nCopyright Rococpy')}, 10)">정보</li>
			</ul>
		</div>`)
		x > $(window).width() - 260 ? x = $(window).width() - 260 : x = x;
		y > $(window).height() - ($(".rmain").height() + 22) ? y = $(window).height() - ($(".rmain").height() + 30) : y = y;
		$(".rmain").css({"top": y, "left": x});
		setTimeout(() => {
			 $(".rmain").css({"transform": "scale(1.0)", "opacity": "1", "box-shadow": "0px 0px 8px gray"});
		}, 1)
	},

	clear(){
		$(".ri_gh_t").css({"transform": "scale(0.9)", "opacity": "0", "box-shadow": "none"});
		setTimeout(() => {
			$(".ri_gh_t").remove();
		}, 201)
	}
}

$(() => Right.hook())
