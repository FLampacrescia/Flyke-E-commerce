import "./SmallTextGroup.css"

export default function SmallTextGroup() {
    return (
        <div className="description-row-container">
            <div className="description-left">
                <h3 className="description-title">¿Quiénes somos?</h3>
                <p className="description">
                    Fundada en Buenos Aires en 2024, nuestra empresa nació con un propósito
                    claro: impulsar los sueños y el rendimiento deportivo de cada persona. Nos
                    mueve la pasión por el deporte y el compromiso de brindar productos que no
                    solo mejoren el rendimiento, sino que también inspiren.
                </p>
            </div>
            <div className="description-right">
                <h3 className="description-title">Nuestra visión</h3>
                <p className="description">
                    Transformar al mundo a través del poder del deporte. Creemos que cada
                    persona tiene un atleta interior, y nuestra misión es apoyarlo en cada
                    paso, ya sea en la cancha, en las calles o en la vida cotidiana. En
                    nuestras zapatillas vas a encontrar un impulso para superar tus límites y
                    alcanzar nuevas metas.
                </p>
            </div>
        </div>
    )
}
