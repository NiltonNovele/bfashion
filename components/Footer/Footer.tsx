import Link from "next/link";
import {
  Instagram,
  Phone,
  Building2,
  HelpCircle,
  Store,
  Contact,
} from "lucide-react";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      {/* MAIN FOOTER */}
      <div className={styles.footerContainer}>
        <div className={`app-max-width app-x-padding ${styles.footerContents}`}>

          {/* COMPANY */}
          <div>
            <h3 className={`${styles.footerHead} flex items-center gap-2`}>
              <Building2 size={18} />
              Empresa
            </h3>
            <div className={styles.column}>
              <Link href="/sobre">Sobre Nós</Link>
              <Link href="/sobre">Contacte-Nos</Link>
              <a href="#">Carreiras</a> {/* External? Keep as <a> */}
            </div>
          </div>

          {/* HELP */}
          <div>
            <h3 className={`${styles.footerHead} flex items-center gap-2`}>
              <HelpCircle size={18} />
              Ajuda
            </h3>
            <div className={styles.column}>
              <Link href="/coming-soon">Rastreamento de Pedido</Link>
              <Link href="/coming-soon">Perguntas Frequentes</Link>
              <Link href="/coming-soon">Política de Privacidade</Link>
              <Link href="/coming-soon">Termos & Condições</Link>
            </div>
          </div>

          {/* STORE */}
          <div>
            <h3 className={`${styles.footerHead} flex items-center gap-2`}>
              <Store size={18} />
              Loja
            </h3>
            <div className={styles.column}>
              <Link href="/product-category/women">Mulheres</Link>
              <Link href="/product-category/men">Homens</Link>
              <Link href="/product-category/bags">Bolsas</Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className={`${styles.footerHead} flex items-center gap-2`}>
              <Contact size={18} />
              Manter Contato
            </h3>
            <div className={styles.column}>
              <span>Maputo, Moçambique</span>
              <span className="flex items-center gap-2">+258 87 552 9325</span>
              <span>
                Aberto Todos os Dias <br /> Loja Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="flex flex-col items-center pb-16 text-center">
        <h4 className="text-3xl mb-4">Newsletter</h4>
        <span className="px-6 max-w-xl">
          Seja o primeiro a saber sobre novas chegadas, promoções e descontos!
        </span>

        <div className="mt-5 px-6 flex w-full sm:w-auto flex-col sm:flex-row">
          <Input
            label="Email"
            name="email"
            type="email"
            extraClass="w-full sm:w-auto"
          />

          <Button
            size="lg"
            value="Enviar"
            extraClass="ml-0 mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto tracking-widest"
          />
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className={styles.bottomFooter}>
        <div className="app-max-width app-x-padding w-full flex flex-col sm:flex-row justify-between items-center gap-3">

          <span>© 2026 BFashion. Todos os direitos reservados.</span>

          <span className="flex items-center gap-2">
            <span className="hidden sm:block">Siga-nos nas Redes Sociais:</span>

            <a
              href="https://www.instagram.com/bfashion_storee/"
              aria-label="Instagram BFashion"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <Instagram size={22} />
            </a>
          </span>

          <span className="text-sm">
            Desenvolvido pela{" "}
            <a
              href="https://synctechx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              <strong>SyncTechX</strong>
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
