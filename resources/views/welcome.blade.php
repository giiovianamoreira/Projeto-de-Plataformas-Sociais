<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">


        <link rel="stylesheet" href="/css/index.css">
        <style>
            .carousel-limitate{
                margin: 15px 40px 15px 40px;
                border-radius: 50px ;
                overflow: hidden;
                }
            .carousel-inner {
    max-height: 400px; /* Define a altura para alinhar verticalmente */
}
.carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Faz com que a imagem cubra o contêiner mantendo a proporção */
    display: block; /* Garante que a imagem seja exibida como bloco */
}


        </style>
    </head>
    
    <body>  
    <header>
        <nav>
            <h3>Logo</h3>
            <div id="search-container">
                <input type="text">
                <ion-icon name="search-outline"></ion-icon>
            </div>
            <div id="links-routes">
            @if (Route::has('login'))       
                            @auth
                            <div class="font-medium text-base text-gray-800">bem vindo,  {{ Auth::user()->name }}!</div>
                            <a href="{{ url('/dashboard') }}" class="rounded-circle">
                            <ion-icon name="person-outline"></ion-icon>
                            </a>   
                            @else
                            <div class="nav-user-link">
                                <a
                                    href="{{ route('login') }}"
                                    class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Logar
                                </a>
                            </div>
                            @if (Route::has('register'))
                                <div class="nav-user-link">
                                    <a
                                        href="{{ route('register') }}"
                                        class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Registrar
                                    </a>
                                </div>
                                @endif
                            @endauth
                        
                    @endif
            </div>
        </nav>
    </header>
    <main>
        <a href="#" class="text-dark fw-medium" >NOTÍCIAS</a>
        <a href="#" class="text-dark fw-medium" >ENCONTROS</a>
        <a href="#" class="text-dark fw-medium" >SOBRE NÓS</a>
    </main>
    <div class="carousel-limitate" >
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="{{ asset('imgs/medicosfronteira.jpeg') }}" class="d-block c-slider" alt="primeiro slide">
                    <div class="carousel-caption d-none d-md-block z-index-5">
                        <h5 >medicos sem fronteiras</h5>
                        <p>...</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="{{ asset('imgs/medicosfronteira.jpeg') }}" class="d-block c-slider" alt="segundo slide">
                    <div class="carousel-caption d-none d-md-block z-index-5">
                        <h5>medicos sem fronteiras</h5>
                        <p>...</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="{{ asset('imgs/medicosfronteira.jpeg') }}" class="d-block c-slider" alt="terceiro slide">
                    <div class="carousel-caption d-none d-md-block z-index-5">
                        <h5>medicos sem fronteiras</h5>
                        <p>...</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>     
    
    <div class="row text-center container">
        <div class="col text-bg-dark">EDUCAÇÃO</div>
        <div class="col text-bg-dark">MEIO AMBIENTE</div>
        <div class="col text-bg-dark">REFUGIADOS E <br> IMIGRANTES</div>
    </div>  
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    </body>
    
</html>
