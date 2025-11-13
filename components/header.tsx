"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe, Menu, X } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Header() {
  const [currency, setCurrency] = useState("USD")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const languageFlag = language === "es" ? "🇪🇸" : language === "en" ? "🇺🇸" : "🇫🇷"
  const languageName = language === "es" ? "Español" : language === "en" ? "English" : "Français"

  return (
    <nav
      className={`border-b border-[#1a1f2e] bg-[#0a0e1a] sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-8"}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Logo className={`transition-all duration-300 ${isScrolled ? "h-16 my-1" : "h-24 my-2"}`} />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>{t("header.bareMetal")}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/vps"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                <div className="font-medium text-sm">{t("header.vps")}</div>
                <div className="text-xs text-slate-500">{t("header.vpsDesc")}</div>
              </Link>
              <Link
                href="/bare-metal"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.bareMetal")}</div>
                <div className="text-xs text-slate-500">{t("header.bareMetalDesc")}</div>
              </Link>
              <Link
                href="/servidores-dedicados"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.dedicated")}</div>
                <div className="text-xs text-slate-500">{t("header.dedicatedDesc")}</div>
              </Link>
              <Link
                href="/clusters"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.clusters")}</div>
                <div className="text-xs text-slate-500">{t("header.clustersDesc")}</div>
              </Link>
              <Link
                href="/gpu-servers"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.gpuServers")}</div>
                <div className="text-xs text-slate-500">{t("header.gpuServersDesc")}</div>
              </Link>
              <Link
                href="/storage-servers"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.storageServers")}</div>
                <div className="text-xs text-slate-500">{t("header.storageServersDesc")}</div>
              </Link>
              <Link
                href="/calculadora"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.calculator")}</div>
                <div className="text-xs text-slate-500">{t("header.calculatorDesc")}</div>
              </Link>
              <Link
                href="/comparador-servidores"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">{t("header.comparator")}</div>
                <div className="text-xs text-slate-500">{t("header.comparatorDesc")}</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium whitespace-nowrap">
              <span>{t("header.publicCloud")}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/public-cloud"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg font-semibold border-b border-slate-700"
              >
                <div className="font-medium text-sm">{t("header.firstSteps")}</div>
                <div className="text-xs text-slate-500">{t("header.firstStepsDesc")}</div>
              </Link>
              <Link
                href="/public-cloud/compute"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.compute")}</div>
                <div className="text-xs text-slate-500">{t("header.computeDesc")}</div>
              </Link>
              <Link
                href="/public-cloud/storage"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.storage")}</div>
                <div className="text-xs text-slate-500">{t("header.storageDesc")}</div>
              </Link>
              <Link
                href="/public-cloud/network"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.network")}</div>
                <div className="text-xs text-slate-500">{t("header.networkDesc")}</div>
              </Link>
              <Link
                href="/public-cloud/containers"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.containers")}</div>
                <div className="text-xs text-slate-500">{t("header.containersDesc")}</div>
              </Link>
              <Link
                href="/public-cloud/databases"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.databases")}</div>
                <div className="text-xs text-slate-500">{t("header.databasesDesc")}</div>
              </Link>
              <Link
                href="/public-cloud/ai-ml"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.aiMl")}</div>
                <div className="text-xs text-slate-500">{t("header.aiMlDesc")}</div>
              </Link>
              <Link
                href="/public-cloud/analytics"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.analytics")}</div>
                <div className="text-xs text-slate-500">{t("header.analyticsDesc")}</div>
              </Link>
              <Link
                href="/public-cloud/security"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">{t("header.security")}</div>
                <div className="text-xs text-slate-500">{t("header.securityDesc")}</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>{t("header.domainsHostingEmail")}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/domains/search"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                <div className="font-medium text-sm">{t("header.searchDomain")}</div>
                <div className="text-xs text-slate-500">{t("header.searchDomainDesc")}</div>
              </Link>
              <Link
                href="/domains/renew"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.renewDomain")}</div>
                <div className="text-xs text-slate-500">{t("header.renewDomainDesc")}</div>
              </Link>
              <Link
                href="/domains/aftermarket"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.aftermarket")}</div>
                <div className="text-xs text-slate-500">{t("header.aftermarketDesc")}</div>
              </Link>
              <Link
                href="/hosting/packages"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.hostingPackages")}</div>
                <div className="text-xs text-slate-500">{t("header.hostingPackagesDesc")}</div>
              </Link>
              <Link
                href="/hosting/ssl"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.sslCertificates")}</div>
                <div className="text-xs text-slate-500">{t("header.sslCertificatesDesc")}</div>
              </Link>
              <Link
                href="/hosting/cdn"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.cdn")}</div>
                <div className="text-xs text-slate-500">{t("header.cdnDesc")}</div>
              </Link>
              <Link
                href="/hosting/wordpress"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.wordpressHosting")}</div>
                <div className="text-xs text-slate-500">{t("header.wordpressHostingDesc")}</div>
              </Link>
              <Link
                href="/domains/whois"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">{t("header.whois")}</div>
                <div className="text-xs text-slate-500">{t("header.whoisDesc")}</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>{t("header.privateCloud")}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                href="/nube-privada"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg font-semibold"
              >
                <div className="font-medium text-sm">{t("header.privateCloudDesc")}</div>
                <div className="text-xs text-slate-500">{t("header.privateCloudDesc")}</div>
              </Link>
              <div className="border-t border-slate-700 my-1"></div>
              <Link
                href="/nube-privada/nutanix"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.nutanix")}</div>
                <div className="text-xs text-slate-500">{t("header.nutanixDesc")}</div>
              </Link>
              <Link
                href="/nube-privada/sap-hana"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.sapHana")}</div>
                <div className="text-xs text-slate-500">{t("header.sapHanaDesc")}</div>
              </Link>
              <Link
                href="/nube-privada/almacenamiento"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.enterpriseStorage")}</div>
                <div className="text-xs text-slate-500">{t("header.enterpriseStorageDesc")}</div>
              </Link>
              <div className="border-t border-slate-700 my-1"></div>
              <Link
                href="/nube-privada/iam"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.iam")}</div>
                <div className="text-xs text-slate-500">{t("header.iamDesc")}</div>
              </Link>
              <Link
                href="/nube-privada/logs-platform"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">{t("header.logsPlatform")}</div>
                <div className="text-xs text-slate-500">{t("header.logsPlatformDesc")}</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>{t("header.connectPlus")}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/connect/troncales"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                <div className="font-medium text-sm">{t("header.sipTrunks")}</div>
                <div className="text-xs text-slate-500">{t("header.sipTrunksDesc")}</div>
              </Link>
              <Link
                href="/connect/ivr"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.ivr")}</div>
                <div className="text-xs text-slate-500">{t("header.ivrDesc")}</div>
              </Link>
              <Link
                href="/connect/callcenter"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.callCenter")}</div>
                <div className="text-xs text-slate-500">{t("header.callCenterDesc")}</div>
              </Link>
              <Link
                href="/connect/pbx"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.virtualPBX")}</div>
                <div className="text-xs text-slate-500">{t("header.virtualPBXDesc")}</div>
              </Link>
              <Link
                href="/connect/esim"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">{t("header.eSimPlatform")}</div>
                <div className="text-xs text-slate-500">{t("header.eSimPlatformDesc")}</div>
              </Link>
              <Link
                href="/connect/sms"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">{t("header.smsWhatsAppApi")}</div>
                <div className="text-xs text-slate-500">{t("header.smsWhatsAppApiDesc")}</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>{currency}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setCurrency("USD")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                USD $
              </button>
              <button
                onClick={() => setCurrency("EUR")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                EUR €
              </button>
              <button
                onClick={() => setCurrency("MXN")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                MXN $
              </button>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-base">{languageFlag}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setLanguage("es")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 first:rounded-t-lg"
              >
                <span className="text-base">🇪🇸</span>
                <span>Español</span>
              </button>
              <button
                onClick={() => setLanguage("en")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span className="text-base">🇺🇸</span>
                <span>English</span>
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 last:rounded-b-lg"
              >
                <span className="text-base">🇫🇷</span>
                <span>Français</span>
              </button>
            </div>
          </div>

          <Button asChild variant="default" className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm ml-2">
            <Link href="/login">{t("header.login")}</Link>
          </Button>
        </div>

        <button
          className="lg:hidden text-slate-300 hover:text-cyan-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1a1f2e] bg-[#0f1419]">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/vps"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("header.vps")}
            </Link>
            <Link
              href="/bare-metal"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("header.bareMetal")}
            </Link>
            <Link
              href="/clusters"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("header.clusters")}
            </Link>
            <Link
              href="/calculadora"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("header.calculator")}
            </Link>
            <Link
              href="/dominios"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("header.domainsHostingEmail")}
            </Link>
            <Link
              href="/nube-privada"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("header.privateCloud")}
            </Link>
            <Link
              href="/connect"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("header.connectPlus")}
            </Link>
            <Button asChild variant="default" className="bg-cyan-500 hover:bg-cyan-600 text-white w-full mt-2">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                {t("header.login")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
