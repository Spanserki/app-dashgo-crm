import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function DistanceDate(date: string) {
    const publishedAt = formatDistanceToNow(new Date(date), {
        locale: ptBR,
        addSuffix: true
    })
    return publishedAt;
}