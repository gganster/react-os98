export default function Ie({size}) {
  return (
    <>
        <div className="menu-bar ">
          <ul className="menu flex gap-2 mt-1 ml-1">
            <li>Fichier</li>
            <li>Édition</li>
            <li>Format</li>
            <li>Affichage</li>
            <li>?</li>
          </ul>
        </div>

        <iframe
          src="https://web.archive.org/web/1998/https://www.google.com/"
          className="w-full h-full"
          style={{
            width: '100%',
            height: `${size.height - 72}px`,
            border: 'none',
          }}
        />

        <div class="status-bar">
          <p class="status-bar-field"></p>
          <p class="status-bar-field"></p>
          <p class="status-bar-field">Internet</p>
        </div>
    </>
  )
}