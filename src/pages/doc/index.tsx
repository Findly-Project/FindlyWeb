import { docData } from '@/shared/data/documentation'

export const DocumentationPage = () => {
  return (
    <div>
      {docData.map(e => {
        return (
          <div>
            <h2>{e.block}</h2>
            {e.items.map(e => {
              return (
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.value}</p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
