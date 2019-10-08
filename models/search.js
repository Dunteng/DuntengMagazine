import { Request } from "../utils/request"

class SearchModel extends Request {

    getSearchRecommend(word) {
        return this.getData({
            url: `/searchArticleRecommend.json/${word}`
        })
    }

    getSearchArticleList(word, start = 0) {
        return this.getData({
            url: `/searchArticleList/${word}/${start}.json`
        })
    }

}
export { SearchModel }