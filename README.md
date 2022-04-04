# 2022 Dcard Frontend Intern HW

Project Link:

🔗 Demo: [https://dcard.xcoder.me](https://dcard.xcoder.me/)

🔗 GitHub: [https://github.com/ericyangchen/Dcard-frontend-intern-2022](https://github.com/ericyangchen/Dcard-frontend-intern-2022)

# Overview

- Launch Project
- Introduction & Structure
- Responsive Web Design
- IntersectionObserver & InfiniteScroll
- GitHub API, React Context and Reducer
- Handling Exceptions
- Deploy Online
- Conclusion

# Launch Project

To start the project locally, type

```bash
git clone https://github.com/ericyangchen/Dcard-frontend-intern-2022.git
cd Dcard-frontend-intern-2022
npm install
npm start
```

React app 就會在 localhost:3000(default port)啟動！

# Introduction & Structure

## Introduction

這個 Project 是用*create-react-app*來產生 template code，搭配**_Tailwind CSS_**的*utility classes*來加快 UI 的開發。

這個 Project 使用 GitHub Rest API 獲取使用者的 repositories，搭配 Intersection Observer 來觸發 Infinite Scroll 有效率地獲取大量 repositories 的資料，並利用**_React Context API, useReducer_**來儲存資料，避免重複發送 API request，令使用體驗得到升級。

## Structure

整個 Project 的 structure 大致上如下。總共有三個主要的 pages，分別是 Home, RepoOverview 以及 RepoDetail。

![Structure Tree](https://i.imgur.com/0hnE5VV.png)

Home 為 Project 的首頁，內有 search bar 來輸入 username。

![Home Page Mobile](https://i.imgur.com/BOqCYAE.png)

![Home Page Desktop](https://i.imgur.com/yfrKuqh.png)

repoOverview 是實作 repository 列表的頁面，列出 User 的基本資訊以及 Repositories。每個 Repository 內有 name, stargazers_count 等資訊。

![Repo List Mobile](https://i.imgur.com/kg1nTkA.png)

![Repo List Desktop](https://i.imgur.com/1FFJfKh.png)

repoDetail 是實作單一 repository 的頁面，除了列出該 repository 的 name, description, stargazers_count, hyperlink 外，另外加入 repository 的檔案(content)。

![Repo Detail Mobile](https://i.imgur.com/Na2UW2I.png)

![Repo Detail Desktop](https://i.imgur.com/yLbpMRA.png)

# Responsive Web Design

這次利用 Tailwind CSS 的 utility class，加快了 responsive design 的部分，以 mobile-first 的設計，並同時顧慮到 desktop user 的體驗。

# IntersectionObserver & InfiniteScroll

在 pages/repoOverview 內，需要實作了 infinite scroll 的功能來滾動頁面並載入新的 repository。由於之前沒有做過這個功能，我從網路上找到三個方向：

1. 利用`document.addEventListener`來 listen ‘scroll’ event，透過計算 scrollY 的距離以及 repository list 的長度來推算什麼時候需要更新 repository list。這個方法雖然很直覺但對 performance 而言不是一個理想的方式，因其在 scroll 的過程中會不斷觸發 listener。

2. 利用 danbovey 的[react-infinite-scrolle](https://github.com/danbovey/react-infinite-scroller)[r](https://github.com/ankeetmaini/react-infinite-scroll-component) package 中的`<InfiniteScroll>`來實現 infinite scroll，雖然這個 repository 的 star count 還不錯，但由於我想自己實作並瞭解看看，所以跳過了這個 package。

3. 利用 Intersection Observer API，當最後一個 list element 進入父層的 viewport 時，觸發 isIntersecting，便可以得知已經滑到了最後一個 element，可以呼叫 API 更新 repo list 了。由於 Intersection Observer 是 asynchronous 的 API，相較於 scroll event listener 更能降低 main thread 的壓力。

最後我選擇了 Intersection Observer 來實作。過程中我發現如果我一直往下 scroll，會不斷觸發 api call，在上一次 api call 還沒得到資料前，又發出同樣的 api call，產生不必要的浪費。解決的辦法是，設定 loading 狀態，先檢查 loading state，如果還在 loading 就直接 return，如此一來，順利的解決重複的 api call。

![Infinite Scroll](https://i.imgur.com/FiHcgeq.png)

# GitHub API, React Context and Reducer

## GitHub API

這次基本需要用到的 API 有兩種，**/user/{username}/repos** 和 **/repos/{username}/{repo}** 兩個 GET request。

我額外使用了 **/user/{username}** 和 **/repos/{username}/{repo}/contents** 來獲得更多 user 的資訊以及單一 repository 的檔案。

另外，在 repoOverview 頁裡，我增加了 sort 的功能，可以依照 name 或 last updated 來排序 repository list，令使用者更好的查找 repository。所以 **/repos/{username}/{repo}** 也多了 sort 的 param。

![APIs](https://i.imgur.com/iKF0DBu.png)

## React Context and Reducer

在 contexts 中的 RepoContext.js 和 RepoReducer.js，主要幫助 app 儲存一些 state（例如：user, repo_list, repos, ...），避免重複發送相同的 API。這兩份檔案可說是最花時間的部分，處理 user state, repository list, repos 更新的重要邏輯都放在這裡，讓我在 pages/RepoOverview 裡可以很方便的呼叫 useRepo()這個 custom hook 裡的 fetchRepoList 和 fetchRepoDetail 兩個 function，就能輕鬆的拿到資料。

# Handling Exceptions

在 RepoContext 的 state 中，有一個 error 專門來記錄遇到的 exceptions，利用 try catch 將 api call 包起來後，若是有 error 便會被 catch 到並存入 error 的 object 中。components/utility/Error.jsx 為專門用來顯示錯誤內容的頁面。

GitHub API 的 Docs 中有提及幾項 status code：

1. 200：default response (success)

2. 301：moved permanently

3. 403：forbidden

4. 404：Resource Not found

我便根據這些 status code 在 Error page 裡顯示對應的錯誤，並利用 setTimeout 設定三秒後清除錯誤並跳轉回主頁面，使用者也可以點擊 Header 上的 logo，立即跳轉回主畫面（自動清除 Error）。

# Deploy Online

因為上個月有用過 firebase 來當 BaaS 跟 Hosting，所以這次直接利用 firebase 的 Hosting service 將網頁部署在自己的 subdomain 裡（[https://dcard.xcoder.me](https://dcard.xcoder.me/)）。

# Conclusion

這次的作業其實讓我學到很多，已經不僅僅是一份實習面試作業而已了。在三月初的時候，我在 YouTube 上看到有人在做很簡單版的 amazon clone，我突發奇想，想要寫寫看 React，希望寫出一個 ecommerce 的網站，賺點小錢，並累積 side project 的經驗。經過一個月的摸索後，總算是寫出了一個樣子來（[https://ecommerce.xcoder.me](https://ecommerce.xcoder.me)）。三月底的時候，遇到 Dcard frontend 的實習校園博覽會攤位，便很想嘗試看看，於是利用這幾天完成這個作業，覺得自己學到了超級多東西，☺️。
