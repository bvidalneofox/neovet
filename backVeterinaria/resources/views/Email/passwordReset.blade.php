@component('mail::message')
# Cambio de Contraseña

Si usted no ha solicitado cambio de contraseña puede omitir este mensaje, en caso contrario presione el boton de abajo para restablecer su contraseña de acceso a Neovet.

@component('mail::button', ['url' => 'http://localhost:4200/cambiarPasswordOlvidada?token='.$token])
Reiniciar Contraseña
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
