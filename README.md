# Rco-RightClick

RightClick.js는 커스텀 된 우클릭 메뉴를 제공합니다.\
여러가지 상호작용 이벤트를 감지하여 상황에 맞는 추가 우클릭 메뉴를 보여줍니다.

### Requirements
 * jQuery (↑ 1.12.4, recommends 3.6.0)
 
## How To Use
### Script 로드
```html
<script src="https://cdn.rococpy.com/js/RightClick.js"></script>
```
> 또는 다운로드한 레포지토리의 `RightClick.js`를 이동 및 로드.

### 기본 설정

> * 해당 라이브러리를 사용하려면 사전 설정이 필요합니다.
> * HTML `<script>`를 통해 RightClick.js가 로드 되기 전에 선언을 해주시면 됩니다.
```js
const Rco__urls = [
  ["메인페이지", "/"],
  ["공지사항", "/notice"]
]
```

### 다크 모드
> * HTML `<style>` 또는 CSS파일을 통해 하단의 CSS코드가 포함되어있을시 적용됩니다.
```css
.Rco__right{
  background: #333!important;
  color: white!important;
}

.Rco__right li:before{
  background: gray!important;
}
```
 
## Preview
* Rococpy의 패밀리 사이트 대부분 해당 라이브러리가 적용되어 있습니다. https://rococpy.com

### 기본 우클릭
![rjssample](https://user-images.githubusercontent.com/50366343/127797290-50923186-09f8-4390-b419-a82c23d00fc2.png)

### 이미지 우클릭
![rjssample1](https://user-images.githubusercontent.com/50366343/127797426-396c4f36-0b82-406e-b18b-648491e8a5d8.png)

### A태그 우클릭
![rjssample2](https://user-images.githubusercontent.com/50366343/127797533-cdbafc7f-d079-4dce-a793-ed24113f7b2e.png)

### Dark Mode
![rjssample3](https://user-images.githubusercontent.com/50366343/127798117-e0ed9e85-96f9-4d44-a7b8-b8e3761d1e92.png)

## License
Apache License 2.0이 적용됩니다.
