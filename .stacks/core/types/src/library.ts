import type { TagsOptions } from './components'

/**
 * **Library Options**
 *
 * This configuration defines all of your library options. Because Stacks is fully-typed, you
 * may hover any of the options below and the definitions will be provided. In case you
 * have any questions, feel free to reach out via Discord or GitHub Discussions.
 */
export interface LibraryOptions {
  /**
   * The base name of your library/libraries.
   */
  name: string

  /**
   * The organization / parent / owner name.
   * @example
   * ```ts
   * const owner = 'your-org' // <-- this is the owner
   * const repository = 'your-repo'
   * const packageName = owner ? `@${owner}/${repository}' // @your-org/your-repo  <-- this is where the owner's name would be used
   * ```
   */
  owner: string | null

  /**
   * The package registry to use.
   */
  packageRegistry: 'npm'

  /**
   * The path of your repository.
   *
   * @example
   * "your-org/your-repo"
   */
  repository: string

  /**
   * The list of accepted SPDX licenses.
   * When developing OS packages, you may want to utilize an OSI approved license.
   *
   * @example
   * "MIT"
   * @see https://opensource.org/licenses
   */
  license: LicenseType

  /**
   * The author's name of the library.
   */
  author: string

  /**
   * A list of all the contributors.
   */
  contributors: string[]

  /**
   * The default language used within your stack.
   */
  defaultLanguage: LanguageCode

  /**
   * The Vue component library options.
   */
  vueComponents: LibraryBuildOptions

  /**
   * The Web Component library options.
   */
  webComponents: LibraryBuildOptions

  /**
   * The Web Component library options.
   */
  functions: LibraryBuildOptions
}

export type LibraryConfig = LibraryOptions

/**
 * The list of available options to build your library.
 */
export interface LibraryBuildOptions {
  /**
   * The name of your library as published to npm.
   */
  name: string

  /**
   * The description of your library as published to npm.
   */
  description: string

  /**
   * The keywords of your library as published to npm.
   */
  keywords: string[]

  /**
   * Should your library generate a sourcemap?
   * @default false
   */
  shouldGenerateSourcemap?: boolean

  /**
   * This is where you define the functions/composables that need to be included
   * in your library. For example, including your `counter` function to be
   * built would require `../functions/counter.ts` to be present.
   */
  functions?: string[]

  /**
   * This is where you define the components that need to be included in
   * your library. For example, including your `HelloWorld` to be built
   * would require `../components/HelloWorld.vue` to be present.
   *
   * @example
   * {
   *   tags: [{
   *     name: 'HelloWorld' // export { default as HelloWorld } from './components/HelloWorld.vue'
   *   }]
   * }
   *
   * @example
   * {
   *   tags: [{
   *     name: ['HelloWorld', 'AppHelloWorld'] // export { default as AppHelloWorld } from './components/HelloWorld.vue'
   *   }]
   * }
   */
  tags?: TagsOptions
}

/**
 * The name of your "Stack" which generally is your library name
 * or a concatenation of your organization & library name.
 */
export type StackName = string

/**
 * The list of accepted SPDX licenses.
 * When developing OS packages, you may want to utilize an OSI approved license.
 * @see https://opensource.org/licenses
 */
export type LicenseType = 'CC-BY-NC-ND-2.0' | 'SGI-B-2.0' | 'LPPL-1.3c' | 'NIST-PD-fallback' | 'libtiff' | 'XSkat' | 'PDDL-1.0' | 'KiCad-libraries-exception' | 'CC-BY-NC-SA-1.0' | 'GFDL-1.1-no-invariants-only' | 'Xerox' | 'LPPL-1.1' | 'VOSTROM' | 'UCL-1.0' | 'ADSL' | 'OSL-2.0' | 'AAL' | 'FDK-AAC' | 'W3C-20150513' | 'AFL-1.1' | 'W3C' | 'Sleepycat' | 'CECILL-1.1' | 'mpich2' | 'SISSL' | 'NLOD-1.0' | 'ANTLR-PD' | 'GPL-3.0-only' | 'gnuplot' | 'NLOD-2.0' | 'BSD-3-Clause-Open-MPI' | 'LiLiQ-P-1.1' | 'BSD-3-Clause-Clear' | 'FSFUL' | 'CC-BY-NC-SA-2.0-UK' | 'CERN-OHL-S-2.0' | 'Spencer-94' | 'CERN-OHL-1.2' | 'GFDL-1.1-or-later' | 'AGPL-1.0-or-later' | 'Wsuipa' | 'AML' | 'BSD-2-Clause' | 'DSDP' | 'CC-BY-2.5' | 'MIT-CMU' | 'Beerware' | 'Sendmail' | 'TU-Berlin-1.0' | 'CNRI-Jython' | 'mplus' | 'CPOL-1.02' | 'BSD-3-Clause-No-Nuclear-License-2014' | 'ISC' | 'CC-BY-SA-4.0' | 'Eurosym' | 'LGPL-3.0-only' | 'OLDAP-1.3' | 'GFDL-1.1-invariants-or-later' | 'Glulxe' | 'SimPL-2.0' | 'CDLA-Permissive-2.0' | 'GPL-2.0-with-font-exception' | 'OGL-UK-2.0' | 'CC-BY-SA-3.0-DE' | 'CC-BY-ND-1.0' | 'GFDL-1.1' | 'CC-BY-4.0' | 'OpenSSL' | 'TU-Berlin-2.0' | 'DOC' | 'GFDL-1.2-no-invariants-or-later' | 'QPL-1.0' | 'OLDAP-2.8' | 'OML' | 'OLDAP-2.7' | 'NIST-PD' | 'Bitstream-Vera' | 'GFDL-1.2-or-later' | 'OFL-1.1-RFN' | 'Bahyph' | 'Barr' | 'COIL-1.0' | 'GFDL-1.3' | 'CECILL-B' | 'JPNIC' | 'Zed' | 'ICU' | 'CC-BY-NC-SA-2.5' | 'CC-BY-ND-3.0-DE' | 'bzip2-1.0.5' | 'SPL-1.0' | 'YPL-1.0' | 'OSET-PL-2.1' | 'Noweb' | 'RPSL-1.0' | 'BSD-3-Clause-LBNL' | 'CDLA-Sharing-1.0' | 'CECILL-1.0' | 'AMPAS' | 'APAFML' | 'CC-BY-ND-3.0' | 'D-FSL-1.0' | 'CC-BY-NC-3.0' | 'libpng-2.0' | 'PolyForm-Noncommercial-1.0.0' | 'dvipdfm' | 'GFDL-1.3-or-later' | 'OGTSL' | 'NPL-1.1' | 'GPL-3.0' | 'CERN-OHL-P-2.0' | 'BlueOak-1.0.0' | 'AGPL-3.0-or-later' | 'blessing' | 'ImageMagick' | 'APSL-2.0' | 'MIT-advertising' | 'curl' | 'CC0-1.0' | 'Zimbra-1.4' | 'SSPL-1.0' | 'psutils' | 'CC-BY-SA-2.0-UK' | 'PSF-2.0' | 'Net-SNMP' | 'NAIST-2003' | 'GFDL-1.2-invariants-or-later' | 'SGI-B-1.0' | 'NBPL-1.0' | 'GFDL-1.2-invariants-only' | 'W3C-19980720' | 'OFL-1.0-no-RFN' | 'NetCDF' | 'TMate' | 'NOSL' | 'CNRI-Python-GPL-Compatible' | 'BSD-1-Clause' | 'CC-BY-NC-SA-3.0-DE' | 'BSD-3-Clause-Modification' | 'GLWTPL' | 'GFDL-1.3-only' | 'OLDAP-2.2' | 'CC-BY-ND-4.0' | 'CC-BY-NC-ND-3.0-DE' | 'EUPL-1.0' | 'Linux-OpenIB' | 'LGPL-2.0-or-later' | 'OSL-1.1' | 'Spencer-86' | 'LGPL-2.0' | 'CC-PDDC' | 'CC-BY-NC-ND-3.0' | 'CDL-1.0' | 'Elastic-2.0' | 'CC-BY-2.0' | 'BSD-3-Clause-No-Military-License' | 'IJG' | 'LPPL-1.3a' | 'SAX-PD' | 'BitTorrent-1.0' | 'OLDAP-2.0' | 'Giftware' | 'C-UDA-1.0' | 'LGPL-2.0+' | 'Rdisc' | 'GPL-2.0-with-classpath-exception' | 'CC-BY-3.0-US' | 'CDDL-1.0' | 'Xnet' | 'CPL-1.0' | 'LGPL-3.0-or-later' | 'NASA-1.3' | 'BUSL-1.1' | 'etalab-2.0' | 'MIT-open-group' | 'OLDAP-1.4' | 'GFDL-1.1-invariants-only' | 'RPL-1.1' | 'CC-BY-NC-ND-2.5' | 'FSFULLR' | 'Saxpath' | 'NTP-0' | 'SISSL-1.2' | 'GPL-3.0-or-later' | 'Apache-1.1' | 'CC-BY-SA-2.1-JP' | 'AGPL-3.0-only' | 'GPL-2.0-with-autoconf-exception' | 'Artistic-2.0' | 'App-s2p' | 'Unicode-DFS-2015' | 'diffmark' | 'SNIA' | 'CC-BY-SA-2.5' | 'Linux-man-pages-copyleft' | 'HPND-sell-variant' | 'ZPL-2.1' | 'BSD-4-Clause-UC' | 'LAL-1.2' | 'AGPL-1.0-only' | 'MIT-enna' | 'Condor-1.1' | 'Naumen' | 'GFDL-1.3-no-invariants-or-later' | 'RPL-1.5' | 'PolyForm-Small-Business-1.0.0' | 'EFL-1.0' | 'MirOS' | 'CC-BY-2.5-AU' | 'Afmparse' | 'MPL-2.0-no-copyleft-exception' | 'LiLiQ-Rplus-1.1' | 'AFL-1.2' | 'OSL-1.0' | 'GPL-1.0-only' | 'APSL-1.0' | 'OGL-Canada-2.0' | 'CPAL-1.0' | 'Latex2e' | 'Zend-2.0' | 'Unlicense' | 'xpp' | 'CC-BY-NC-1.0' | 'GPL-3.0-with-autoconf-exception' | 'CC-BY-NC-SA-3.0' | 'TCP-wrappers' | 'SCEA' | 'SSH-short' | 'CC-BY-3.0-NL' | 'SchemeReport' | 'CC-BY-3.0' | 'MPL-2.0' | 'Unicode-TOU' | 'CC-BY-NC-ND-1.0' | 'Entessa' | 'BSD-3-Clause-No-Nuclear-License' | 'SWL' | 'GFDL-1.2-no-invariants-only' | 'Parity-7.0.0' | 'OLDAP-2.2.1' | 'SGI-B-1.1' | 'FTL' | 'OLDAP-2.4' | 'CC-BY-NC-4.0' | 'bzip2-1.0.6' | 'copyleft-next-0.3.0' | 'MakeIndex' | 'NRL' | 'GFDL-1.3-invariants-or-later' | 'CC-BY-NC-2.0' | 'SugarCRM-1.1.3' | 'AFL-2.1' | 'GPL-2.0-only' | 'GFDL-1.3-invariants-only' | 'TORQUE-1.1' | 'Ruby' | 'X11' | 'Borceux' | 'Libpng' | 'X11-distribute-modifications-variant' | 'Frameworx-1.0' | 'NCGL-UK-2.0' | 'CECILL-2.1' | 'CC-BY-3.0-AT' | 'CNRI-Python' | 'NCSA' | 'gSOAP-1.3b' | 'EUPL-1.1' | 'AMDPLPA' | 'Imlib2' | 'CDDL-1.1' | 'WTFPL' | 'LPL-1.0' | 'EPL-1.0' | 'BSD-3-Clause-Attribution' | 'OSL-3.0' | 'RHeCos-1.1' | 'PHP-3.0' | 'BSD-Protection' | 'CC-BY-NC-3.0-DE' | 'APL-1.0' | 'EUDatagrid' | 'GPL-1.0' | 'SHL-0.5' | 'CC-BY-SA-2.0' | 'CC-BY-SA-3.0-AT' | 'CC-BY-NC-SA-3.0-IGO' | 'Adobe-2006' | 'Newsletr' | 'Nunit' | 'Multics' | 'OGL-UK-1.0' | 'Vim' | 'eCos-2.0' | 'Zimbra-1.3' | 'eGenix' | 'IBM-pibs' | 'BitTorrent-1.1' | 'OFL-1.1-no-RFN' | 'psfrag' | 'CC-BY-ND-2.0' | 'SHL-0.51' | 'FreeBSD-DOC' | 'Python-2.0' | 'Mup' | 'BSD-4-Clause-Shortened' | 'CC-BY-NC-SA-4.0' | 'HPND' | 'OLDAP-2.6' | 'MPL-1.1' | 'GPL-2.0-with-GCC-exception' | 'HaskellReport' | 'ECL-1.0' | 'LGPL-2.1-or-later' | 'OFL-1.0' | 'APSL-1.1' | 'MITNFA' | 'CECILL-2.0' | 'Crossword' | 'Aladdin' | 'Baekmuk' | 'XFree86-1.1' | 'GPL-1.0-or-later' | 'CERN-OHL-W-2.0' | 'CC-BY-SA-1.0' | 'NTP' | 'PHP-3.01' | 'OCLC-2.0' | 'CC-BY-3.0-DE' | 'CC-BY-NC-2.5' | 'Zlib' | 'CATOSL-1.1' | 'LGPL-3.0+' | 'CAL-1.0' | 'NPL-1.0' | 'SMLNJ' | 'GPL-2.0+' | 'OLDAP-2.5' | 'JasPer-2.0' | 'GPL-2.0-or-later' | 'BSD-2-Clause-Patent' | 'MS-RL' | 'CUA-OPL-1.0' | 'IPA' | 'NLPL' | 'O-UDA-1.0' | 'MIT-Modern-Variant' | 'OLDAP-1.2' | 'BSD-2-Clause-FreeBSD' | 'Info-ZIP' | 'CC-BY-NC-SA-2.0-FR' | '0BSD' | 'Unicode-DFS-2016' | 'OFL-1.0-RFN' | 'Intel' | 'AFL-2.0' | 'GL2PS' | 'TAPR-OHL-1.0' | 'Apache-1.0' | 'MTLL' | 'Motosoto' | 'RSA-MD' | 'Community-Spec-1.0' | 'ODC-By-1.0' | 'zlib-acknowledgement' | 'DL-DE-BY-2.0' | 'VSL-1.0' | 'LiLiQ-R-1.1' | 'OPL-1.0' | 'GPL-3.0+' | 'MulanPSL-2.0' | 'APSL-1.2' | 'OGDL-Taiwan-1.0' | 'RSCPL' | 'OGC-1.0' | 'EFL-2.0' | 'CAL-1.0-Combined-Work-Exception' | 'MS-PL' | 'Plexus' | 'Sendmail-8.23' | 'Cube' | 'JSON' | 'EUPL-1.2' | 'Adobe-Glyph' | 'FreeImage' | 'Watcom-1.0' | 'Jam' | 'Hippocratic-2.1' | 'OLDAP-2.0.1' | 'CC-BY-NC-SA-2.0' | 'Nokia' | 'OCCT-PL' | 'ErlPL-1.1' | 'TOSL' | 'OSL-2.1' | 'ClArtistic' | 'xinetd' | 'GPL-3.0-with-GCC-exception' | 'ODbL-1.0' | 'MIT' | 'LGPL-2.1+' | 'LGPL-2.1-only' | 'CrystalStacker' | 'ECL-2.0' | 'LPPL-1.0' | 'iMatix' | 'CC-BY-NC-ND-3.0-IGO' | 'BSD-Source-Code' | 'Parity-6.0.0' | 'TCL' | 'Arphic-1999' | 'CC-BY-SA-3.0' | 'Caldera' | 'AGPL-1.0' | 'IPL-1.0' | 'LAL-1.3' | 'EPICS' | 'NGPL' | 'DRL-1.0' | 'BSD-2-Clause-NetBSD' | 'ZPL-1.1' | 'GD' | 'LPPL-1.2' | 'Dotseqn' | 'Spencer-99' | 'OLDAP-2.3' | 'YPL-1.1' | 'Fair' | 'Qhull' | 'GFDL-1.1-no-invariants-or-later' | 'CECILL-C' | 'MulanPSL-1.0' | 'OLDAP-1.1' | 'OLDAP-2.1' | 'LPL-1.02' | 'UPL-1.0' | 'Abstyles' | 'ZPL-2.0' | 'MIT-0' | 'LGPL-2.0-only' | 'GFDL-1.3-no-invariants-only' | 'AGPL-3.0' | 'EPL-2.0' | 'AFL-3.0' | 'CDLA-Permissive-1.0' | 'Artistic-1.0' | 'CC-BY-NC-ND-4.0' | 'HTMLTIDY' | 'Glide' | 'FSFAP' | 'LGPLLR' | 'OGL-UK-3.0' | 'GFDL-1.2' | 'SSH-OpenSSH' | 'GFDL-1.1-only' | 'MIT-feh' | 'MPL-1.0' | 'PostgreSQL' | 'OLDAP-2.2.2' | 'SMPPL' | 'OFL-1.1' | 'Leptonica' | 'CERN-OHL-1.1' | 'BSD-3-Clause-No-Nuclear-Warranty' | 'CC-BY-ND-2.5' | 'CC-BY-1.0' | 'GFDL-1.2-only' | 'OPUBL-1.0' | 'libselinux-1.0' | 'BSD-3-Clause' | 'ANTLR-PD-fallback' | 'copyleft-next-0.3.1' | 'GPL-1.0+' | 'wxWindows' | 'LGPL-3.0' | 'LGPL-2.1' | 'StandardML-NJ' | 'BSD-4-Clause' | 'GPL-2.0-with-bison-exception' | 'Apache-2.0' | 'Artistic-1.0-cl8' | 'GPL-2.0' | 'Intel-ACPI' | 'BSL-1.0' | 'Artistic-1.0-Perl' | 'BSD-2-Clause-Views' | 'Interbase-1.0' | 'NPOSL-3.0'

/**
 * The list of accepted language codes.
 * @see https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
 */
export type LanguageCode = 'aa' | 'ab' | 'af' | 'ak' | 'als' | 'am' | 'an' | 'ang' | 'ang' | 'ar' | 'arc' | 'as' | 'ast' | 'av' | 'awa' | 'ay' | 'az' | 'ba' | 'bar' | 'bat-smg' | 'bcl' | 'be' | 'be-x-old' | 'bg' | 'bh' | 'bi' | 'bm' | 'bn' | 'bo' | 'bpy' | 'br' | 'brx' | 'bs' | 'bug' | 'bxr' | 'ca' | 'cdo' | 'ce' | 'ceb' | 'ch' | 'cho' | 'chr' | 'chy' | 'ckb' | 'co' | 'cr' | 'cs' | 'csb' | 'cu' | 'cv' | 'cy' | 'da' | 'de' | 'diq' | 'dsb' | 'dv' | 'dz' | 'ee' | 'el' | 'en' | 'eo' | 'es' | 'et' | 'eu' | 'ext' | 'fa' | 'ff' | 'fi' | 'fiu-vro' | 'fj' | 'fo' | 'fr' | 'frp' | 'fur' | 'fy' | 'ga' | 'gan' | 'gbm' | 'gd' | 'gil' | 'gl' | 'gn' | 'got' | 'gu' | 'gv' | 'ha' | 'hak' | 'haw' | 'he' | 'hi' | 'ho' | 'hr' | 'ht' | 'hu' | 'hy' | 'hz' | 'ia' | 'id' | 'ie' | 'ig' | 'ii' | 'ik' | 'ilo' | 'inh' | 'io' | 'is' | 'it' | 'iu' | 'ja' | 'jbo' | 'jv' | 'ka' | 'kg' | 'ki' | 'kj' | 'kk' | 'kl' | 'km' | 'kn' | 'khw' | 'ko' | 'kr' | 'ks' | 'ksh' | 'ku' | 'kv' | 'kw' | 'ky' | 'la' | 'lad' | 'lan' | 'lb' | 'lg' | 'li' | 'lij' | 'lmo' | 'ln' | 'lo' | 'lzz' | 'lt' | 'lv' | 'map-bms' | 'mg' | 'man' | 'mh' | 'mi' | 'min' | 'mk' | 'ml' | 'mn' | 'mo' | 'mr' | 'mrh' | 'ms' | 'mt' | 'mus' | 'mwl' | 'my' | 'na' | 'nah' | 'nap' | 'nd' | 'nds' | 'nds-nl' | 'ne' | 'new' | 'ng' | 'nl' | 'nn' | 'no' | 'nr' | 'nso' | 'nrm' | 'nv' | 'ny' | 'oc' | 'oj' | 'om' | 'or' | 'os' | 'pa' | 'pag' | 'pam' | 'pap' | 'pdc' | 'pi' | 'pih' | 'pl' | 'pms' | 'ps' | 'pt' | 'qu' | 'rm' | 'rmy' | 'rn' | 'ro' | 'roa-rup' | 'ru' | 'rw' | 'sa' | 'sc' | 'scn' | 'sco' | 'sd' | 'se' | 'sg' | 'sh' | 'si' | 'sk' | 'sl' | 'sm' | 'sn' | 'so' | 'sq' | 'sr' | 'ss' | 'st' | 'su' | 'sv' | 'sw' | 'ta' | 'te' | 'tet' | 'tg' | 'th' | 'ti' | 'tk' | 'tl' | 'tlh' | 'tn' | 'to' | 'tpi' | 'tr' | 'ts' | 'tt' | 'tum' | 'tw' | 'ty' | 'udm' | 'ug' | 'uk' | 'ur' | 'uz' | 'uz_AF' | 've' | 'vi' | 'vec' | 'vls' | 'vo' | 'wa' | 'war' | 'wo' | 'xal' | 'xh' | 'xmf' | 'yi' | 'yo' | 'za' | 'zh' | 'zh-classical' | 'zh-min-nan' | 'zh-yue' | 'zu'
