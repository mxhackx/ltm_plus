export default function Contact(){
  return (
    <main className="flex flex-row flex-nowrap w-full">
        <form className="bg-blue-400 flex-1 p-5 flex flex-col rounded-xl" method="POST" action="./">
            <label className="w-full flex gap-5" htmlFor="firstname">
                Firstname:
                <input id="firstname" placeholder="Hello" className="border-2 border-blue-300"/>
            </label>
        </form>
        <section className="flex-1">
            <p>Hello</p>
        </section>
    </main>
  )
}
