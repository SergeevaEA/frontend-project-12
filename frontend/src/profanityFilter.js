import filter from 'leo-profanity'

// загружаем русский словарь
filter.add(filter.getDictionary('en'))
filter.add(filter.getDictionary('ru'))

export default filter
