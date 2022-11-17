/* Rco Right Click Js 2.0.1
Copyright 2019 - 2021 Rococpy All rights reserved.*/
const Rco__version = "2.1.0",
  Rco__Status = "Stable";

const Rco__Right = {
  version: "0.0.0",
  changelog: "서버에서 새로운 변경사항을 조회하지 못했습니다.\\nOffline Mode",
  info: "서버에서 새로운 버전을 조회하지 못했습니다.\\nOffline Mode",
  url: "",
  copy: "",

  hook() {
    if (typeof Rco__urls == "object")
      Rco__urls.map(
        (v) =>
          (Rco__Right.url += `<li onclick="location.href='${v[1]}'">${v[0]}(으)로 이동</li>`)
      );

    $.get({ url: "https://update.rococpy.com/api/rightclick" }, (data) => {
      data = JSON.parse(data)[0];
      Rco__Right.version = data["version"];
      Rco__Right.changelog = data["changelog"];

      if (Rco__Status == "Dev")
        Rco__Right.info =
          "이 애드온은 개발중인 버전입니다!\\n해당 애드온은 불안정하며 사용중에 심각한 문제를 일으킬 수 있습니다.\\nhttps://project.rococpy.com/rightclick에서 안정적인 버전을 사용해주세요.";
      else {
        if (Rco__Right.version == "0.0.0") return;
        else if (Rco__Right.version == Rco__version)
          Rco__Right.info = "최신 버전입니다!";
        else if (Rco__Right.version > Rco__version)
          Rco__Right.info = "새로운 버전이 나왔습니다!";
        else
          Rco__Right.info =
            "이 애드온은 손상되었습니다!\\n누군가에 의해 임의로 수정됬을 수 있습니다!\\nhttps://project.rococpy.com/rightclick에서 새로 다운로드 하십시오!";
      }
    }).fail((_) =>
      console.error(
        "[Rco RightClick] Opps!Failed to fetch version information from rococpy server!"
      )
    );

    $.get("https://cdn.rococpy.com/others/RcoRight.css", (data) => {
      $("head").append(`<style>${data}</style>`);

      $(document)
        .on("click", ".Rco__right_modal_background", (_) =>
          $(".Rco__right_modal").remove()
        )
        .on("click", (e) => {
          if (e.target.className !== "Rco__right") Rco__Right.clear();
        })
        .on("keydown", (_) => {
          if ($(".Rco__right_modal_content").length)
            $(".Rco__right_modal").remove();
        })
        .on("contextmenu", (e) => {
          e.preventDefault();

          Rco__Right.open(e.clientX, e.clientY, e);
        });
    }).fail((_) =>
      console.error(
        "[Rco RightClick] Opps!Failed to fetch RightClick Css from rococpy server!\\n[Rco RightClick] Rco Disable RightClick"
      )
    );
  },

  open(x, y, e) {
    Rco__Right.copy =
      window.getSelection().type == "Range"
        ? window.getSelection().getRangeAt(0).toString()
        : "";

    $(".Rco__right").remove();
    $("body").append(`<div class="Rco__right">
			<ul>
				<li onclick="history.back()">이전 페이지</li>
				<li onclick="history.forward()">다음 페이지</li>
				<li onclick="location.reload()">새로고침</li>
				<hr>
				<li onclick="Rco__Right.ctc(location.href)">현재 페이지 URL 복사</li>
				<li onclick="Rco__Right.openmodal(location.href)">현재 페이지의 QR 생성</li>
				${
          e.target.href !== "" && e.target.href !== undefined
            ? `<hr><li onclick="Rco__Right.ctc('${e.target.href}')">링크 복사</li>
					<li onclick="window.open('${e.target.href}')">새 탭에서 링크 열기</li>
					<li onclick="Rco__Right.openmodal('${e.target.href}')">이 링크의 QR 생성</li>`
            : ""
        }
				${
          e.target.currentSrc
            ? `<hr><li onclick="Rco__Right.ctc('${e.target.currentSrc}')">이미지 링크 복사</li>
				<li onclick="window.open('${e.target.currentSrc}')">새 탭에서 이미지 열기</li>
				<li onclick="Rco__Right.openmodal('${e.target.currentSrc}')">이 이미지의 QR 생성</li>`
            : ""
        }
				<hr>
				${
          Rco__Right.copy !== ""
            ? `<li onclick="Rco__Right.ctc(Rco__Right.copy)">선택한 텍스트 복사</li><hr>`
            : ""
        }
				${Rco__Right.url !== "" ? Rco__Right.url + "<hr>" : ""}
				<li onclick="setTimeout(_ => alert('${Rco__Right.changelog.replaceAll(
          "\r\n",
          "\\n"
        )}'), 10)">Change Log</li>
				<li onclick="setTimeout(_ => alert('Rco Right Click Js\\nVersion: ${Rco__version} | Lasted: ${
      Rco__Right.version
    }\\n\\n${Rco__Right.info}\\n\\nCopyright Rococpy'), 10)">정보</li>
			</ul>
		</div>`);

    x = x > $(window).width() - 260 ? $(window).width() - 260 : x;
    y =
      y > $(window).height() - ($(".Rco__right").height() + 22)
        ? $(window).height() - ($(".Rco__right").height() + 30)
        : y;

    $(".Rco__right")
      .css({ top: y, left: x })
      .css({
        transform: "scale(1.0)",
        opacity: "1",
        "box-shadow": "0px 0px 8px gray",
      });
  },

  clear() {
    $(".Rco__right").css({
      transform: "scale(0.9)",
      opacity: "0",
      "box-shadow": "none",
    });
    setTimeout((_) => $(".Rco__right").remove(), 201);
  },

  openmodal(url) {
    $("body").append(`<div class="Rco__right_modal">
			<div class="Rco__right_modal_content">
				<img src="https://chart.googleapis.com/chart?chs=500x500&cht=qr&choe=UTF-8&chl=${url}">
			</div>
			<div class="Rco__right_modal_background"></div>
		</div>`);
  },

  async ctc(val) {
    await navigator.clipboard.writeText(val);
  },
};

$((_) => Rco__Right.hook());
