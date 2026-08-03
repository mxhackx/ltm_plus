import { Button } from "@/components/ui/button";
import { FactoryIcon, Phone, ShoppingBagIcon } from "lucide-react";
import work from "@/../public/worker.jpeg";
import Image from "next/image";
export default function Contact(){
  return (
    <main className="bg-[#e0e0e0] flex flex-row flex-nowrap m-5 rounded-2xl p-0 backdrop-blur-3xl items-center">
        <form className="p-10 flex flex-col w-2/3 gap-5" method="POST" action="./">
            <p className="text-3xl">Contact</p>
            <strong>Contact</strong>
            <input id="name" placeholder="Hello" className="border-2 border-gray-400 p-1"/>
            <input id="email" placeholder="Hello" className="border-2 border-gray-400 p-1"/>
            <input id="telephone" placeholder="Hello" className="border-2 border-gray-400 p-1"/>
            <select id="select" className="border-gray-400 border-2 p-1">
              <option className="">Hello</option>
              <option>Wesh</option>
              <option>Another</option>
            </select>
            <Button className="rounded-sm bg-white">Send</Button>
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <Phone></Phone>
                <div className="flex flex-col gap-1">
                  <p>Hello</p>
                  <p>World</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ShoppingBagIcon></ShoppingBagIcon>
                <div className="flex flex-col gap-1">
                  <p>Hello</p>
                  <p>World</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FactoryIcon></FactoryIcon>
                <div className="flex flex-col gap-1">
                  <p>Hello</p>
                  <p>World</p>
                </div>
              </div>
            </div>
        </form>
        <section className="flex-1 w-1/3">
        <Image src={work} className="rounded-r-2xl" alt="Hello"></Image>
        </section>
    </main>
  )
}
