# Expense tracker v2.0 (家庭記帳本，第二版)

### ALPHA Camp 學期三作業
(老爸的私房錢 （又名【廣志の私帳】）=> 進階挑戰：老爸的私房錢升級)
- 免安裝預覽連結：[https://expense-tracker-practice.herokuapp.com/](https://expense-tracker-practice.herokuapp.com/)

## 如何使用：
0. 至少先在電腦上裝好Node.js、mongoDB Community Edition([依作業系統版本對照說明操作](https://docs.mongodb.com/manual/administration/install-community/))
1. 從本專案頁面將檔案下載，或複製(clone)到要操作的電腦上
2. 開啟終端機(terminal)，將目錄切換至專案資料夾(expense_tracker)
3. 確認是否有在全域(global)環境安裝nodemon，沒有的話，在終端機輸入：
```
npm i nodemon -g
```
4. 使用npm安裝需要的套件：
```
npm i express express-handlebars mongoose method-override validator
npm i express-session passport bcryptjs dotenv connect-flash passport-local passport-facebook
```
5. 建立資料庫與範例資料，供快速檢視功能：
```
npm run seeder
```
以下為測試用的「正確」使用者名稱與對應的帳密：

|(name) | email              | password | (登入後可見資料)     |
| ------| -------------------| ---------| --------------------|
| user1 | user1@example.com  | 12345678 | id #1, #2, #3 號記帳 |
| user2 | user2@example.com  | 12345678 | id #4, #5, #6 號記帳 |
6. 若要測試Faceboo登入功能，需到[Facebook for Developers](https://developers.facebook.com/)建立應用程式
7. 在本專案根目錄依據".env.template"內容格式，新增".env"檔案(可使用終端機指令)，
```
cp .env.template .env
```
並在.env填入Facebook應用程式編號、應用程式密鑰

8. 執行本專案：
```
npm run dev
```
9. 開啟預覽連結
- 若是在本機操作，於瀏覽器網址列輸入[http://localhost:3000](http://localhost:3000)；
- 若使用虛擬主機，則須配合主機服務設定另用網址

## 主要功能：
- 註冊帳號管理(新增、檢視、更新與刪除)個人帳目，藉由密碼登入保護隱私
- 瀏覽現有的帳目清單(含名稱、類別、日期、金額)，並自動計算花費總金額
- 可點選消費類別選單，篩選顯示該類帳目清單，且自動計算該類花費總金額
### 版本更新：
#### 第二版
- 增加月份選單，可同時或分別根據類別與月份篩選支出，亦自動計算顯示總金額
- 每筆支出增加商家欄位(選填)，方便紀錄消費地點，亦可在舊有帳目補上紀錄
